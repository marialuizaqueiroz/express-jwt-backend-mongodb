import { Request, Response } from 'express';
import * as userService from '../services/user.service.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import logger from '../utils/logger.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || name.length < 2) return res.status(422).json({ message: 'Nome inválido' });
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(422).json({ message: 'E-mail inválido' });
    if (!password || password.length < 6) return res.status(422).json({ message: 'Senha inválida (mínimo 6 caracteres)' });

    const user = await userService.createUser(name, email, password);
    logger.info('User registered', email);
    return res.status(201).json({ message: 'Criado com sucesso', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err: any) {
    logger.error('Register error', err.message || err);
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Erro interno' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(422).json({ message: 'E-mail e senha são obrigatórios' });

    const user = await userService.findUserByEmail(email, true);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const match = await userService.comparePassword(password, (user as any).password);
    if (!match) return res.status(401).json({ message: 'Senha inválida' });

    const secret: jwt.Secret = config.jwtSecret as jwt.Secret;
    const signOptions: jwt.SignOptions = { expiresIn: config.jwtExpiresIn as any };

    const token = jwt.sign(
      { sub: (user as any)._id, email: (user as any).email },
      secret,
      signOptions
    );
    logger.info('User logged in', email);
    return res.json({ token });
  } catch (err: any) {
    logger.error('Login error', err.message || err);
    return res.status(500).json({ message: 'Erro interno' });
  }
};

export const protectedRoute = async (req: Request, res: Response) => {
  return res.json({ message: 'Acesso autorizado' });
};

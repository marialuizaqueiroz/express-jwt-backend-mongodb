import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import logger from '../utils/logger.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.warn('Auth token not provided');
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    logger.warn('Token in invalid format');
    return res.status(401).json({ message: 'Token em formato inválido' });
  }

  try {
    const secret = config.jwtSecret as jwt.Secret;
    const decoded = jwt.verify(token, secret);
    
    
    req.user = decoded; 

    next(); 
  } catch (error) {
    logger.error('Invalid auth token', error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
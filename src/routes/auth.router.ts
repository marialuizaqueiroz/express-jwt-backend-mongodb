// import { Router } from 'express';
// import * as authCtrl from '../controllers/auth.controller.js';
// import { authMiddleware } from '../middlewares/auth.middleware.js';

// const router = Router();

// router.post('/register', authCtrl.register);
// router.post('/login', authCtrl.login);
// router.get('/protected', authMiddleware, authCtrl.protectedRoute);

// export default router;

import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Rotas de registro e login de usuários
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/register", authCtrl.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Fazer login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna token JWT
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", authCtrl.login);

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Testar rota protegida com JWT
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso autorizado
 *       401:
 *         description: Token inválido ou ausente
 */
router.get("/protected", authMiddleware, authCtrl.protectedRoute);

export default router;

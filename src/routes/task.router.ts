// import { Router } from 'express';
// import * as taskController from '../controllers/task.controller.js';
// import { authMiddleware } from '../middlewares/auth.middleware.js';

// const router = Router();


// router.use(authMiddleware);

// // POST /api/tasks
// router.post('/', taskController.createTask);

// // GET /api/tasks
// router.get('/', taskController.getAllTasks);

// // GET /api/tasks/:id
// router.get('/:id', taskController.getTaskById);

// // PUT /api/tasks/:id
// router.put('/:id', taskController.updateTaskPut);

// // PATCH /api/tasks/:id
// router.patch('/:id', taskController.updateTaskPatch);

// // DELETE /api/tasks/:id
// router.delete('/:id', taskController.deleteTask);

// export default router;

import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: CRUD de tarefas do usuário
 */

router.use(authMiddleware);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar nova tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 */
router.post("/", taskController.createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar todas as tarefas do usuário
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada
 */
router.get("/", taskController.getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Buscar tarefa por ID
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       404:
 *         description: Tarefa não encontrada
 */
router.get("/:id", taskController.getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualizar tarefa (PUT)
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 */
router.put("/:id", taskController.updateTaskPut);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Atualizar parcialmente uma tarefa (PATCH)
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada parcialmente
 */
router.patch("/:id", taskController.updateTaskPatch);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Excluir tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tarefa deletada
 */
router.delete("/:id", taskController.deleteTask);

export default router;

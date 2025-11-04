import { Router } from 'express';
import * as taskController from '../controllers/task.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();


router.use(authMiddleware);

// POST /api/tasks
router.post('/', taskController.createTask);

// GET /api/tasks
router.get('/', taskController.getAllTasks);

// GET /api/tasks/:id
router.get('/:id', taskController.getTaskById);

// PUT /api/tasks/:id
router.put('/:id', taskController.updateTaskPut);

// PATCH /api/tasks/:id
router.patch('/:id', taskController.updateTaskPatch);

// DELETE /api/tasks/:id
router.delete('/:id', taskController.deleteTask);

export default router;
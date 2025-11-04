import { Request, Response } from 'express';
import * as taskService from '../services/task.service.js';
import logger from '../utils/logger.js';


interface UserPayload {
  sub: string; 
  email: string;
}

// POST /api/tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = (req.user as UserPayload).sub; 
    if (!title) {
      return res.status(422).json({ message: 'O título é obrigatório' });
    }

    const task = await taskService.createTask({ title, description }, userId);
    logger.info(`Task created: ${task._id} by user: ${userId}`);
    return res.status(201).json(task);
  } catch (err: any) {
    logger.error('Error creating task', err);
    return res.status(500).json({ message: 'Erro interno' });
  }
};

// GET /api/tasks 
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as UserPayload).sub;
    const filters = req.query; 

    const tasks = await taskService.findTasks(userId, filters);
    logger.info(`User ${userId} fetched all tasks`);
    return res.status(200).json(tasks);
  } catch (err: any) {
    logger.error('Error fetching tasks', err);
    return res.status(500).json({ message: 'Erro interno' });
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as UserPayload).sub;
    const taskId = req.params.id;

    const task = await taskService.findTaskById(taskId, userId);

    if (!task) {
      
      logger.warn(`Task not found or unauthorized: ${taskId} for user: ${userId}`);
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    logger.info(`Task fetched: ${taskId} by user: ${userId}`);
    return res.status(200).json(task);
  } catch (err: any) {
    logger.error('Error fetching task by id', err);
    return res.status(500).json({ message: 'Erro interno' });
  }
};

// PUT /api/tasks/:id 
export const updateTaskPut = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as UserPayload).sub;
    const taskId = req.params.id;
    const { title, description, completed } = req.body;

    
    if (title === undefined || description === undefined || completed === undefined) {
      return res.status(422).json({ message: 'Requisição incompleta. PUT deve enviar title, description e completed.' });
    }

    const updatedTask = await taskService.updateTask(taskId, userId, { title, description, completed }, true); 

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    logger.info(`Task updated (PUT): ${taskId} by user: ${userId}`);
    return res.status(200).json(updatedTask);
  } catch (err: any) {
    logger.error('Error updating task (PUT)', err);
    return res.status(500).json({ message: 'Erro interno' });
  }
};

// PATCH /api/tasks/:id 
export const updateTaskPatch = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as UserPayload).sub;

    // Tenta pegar o ID de várias fontes (params ou body)
    let taskId = req.params.id;
    if (!taskId || taskId === 'undefined') {
      taskId = req.body._id || req.body.id;
    }

    // Validação adicional
    if (!taskId || taskId === 'undefined') {
      logger.error('❌ ID da tarefa ausente ou inválido');
      return res.status(400).json({ message: 'ID da tarefa inválido' });
    }

    const update = req.body;

    const updatedTask = await taskService.updateTask(taskId, userId, update, false);

    if (!updatedTask) {
      logger.warn(`⚠️ Tarefa não encontrada: ${taskId} (usuário ${userId})`);
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    logger.info(`✅ Task atualizada (PATCH): ${taskId} por usuário ${userId}`);
    return res.status(200).json(updatedTask);
  } catch (err: any) {
    logger.error('💥 Erro ao atualizar task (PATCH)', err);
    return res.status(500).json({ message: 'Erro interno' });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as UserPayload).sub;
    const taskId = req.params.id;

    const deletedTask = await taskService.deleteTask(taskId, userId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    logger.info(`Task deleted: ${taskId} by user: ${userId}`);
    return res.status(204).send(); 
  } catch (err: any) {
    logger.error('Error deleting task', err);
    return res.status(500).json({ message: 'Erro interno' });
  }
};
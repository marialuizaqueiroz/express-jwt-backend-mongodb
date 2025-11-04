import { TaskModel, ITask } from '../models/task.model.js';
import { FilterQuery } from 'mongoose';

const mapTask = (task: any) => {
  if (!task) return null;
  const obj = task.toObject ? task.toObject() : task;
  const { _id, __v, ...rest } = obj;
  return { id: _id?.toString(), ...rest };
};

// Criar uma nova tarefa
export const createTask = async (input: Partial<ITask>, userId: string): Promise<ITask> => {
  const taskData = { ...input, user: userId };
  const task = await TaskModel.create(taskData);
  return mapTask(task);
};

// Listar/Filtrar tarefas DE UM USUÁRIO
export const findTasks = async (userId: string, query: FilterQuery<ITask>): Promise<ITask[]> => {
  const tasks = await TaskModel.find({ user: userId, ...query });
  return tasks.map(mapTask);
};

// Buscar uma tarefa específica DE UM USUÁRIO
export const findTaskById = async (taskId: string, userId: string): Promise<ITask | null> => {
  const task = await TaskModel.findOne({ _id: taskId, user: userId });
  return mapTask(task);
};

// Atualizar uma tarefa DE UM USUÁRIO
export const updateTask = async (
  taskId: string,
  userId: string,
  update: Partial<ITask>,
  overwrite = false
): Promise<any | null> => {
  if (!taskId || taskId === 'undefined') return null; // Evita erro 400

  const options = { new: true, overwrite, includeResultMetadata: false };
  const task = await TaskModel.findOneAndUpdate(
    { _id: taskId, user: userId },
    update,
    options
  );
  return mapTask(task);
};


// Deletar uma tarefa DE UM USUÁRIO
export const deleteTask = async (taskId: string, userId: string): Promise<ITask | null> => {
  const task = await TaskModel.findOneAndDelete(
    { _id: taskId, user: userId },
    { includeResultMetadata: false }
  );
  return mapTask(task);
};
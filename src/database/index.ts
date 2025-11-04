import mongoose from 'mongoose';
import config from '../config/index.js';
import logger from '../utils/logger.js';

export const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(config.mongoUri, {
      ...options,
    });
  } catch (error: any) {
    logger.error('Erro de conexão com MongoDB:', error.message || error);
    throw error; 
  }
};


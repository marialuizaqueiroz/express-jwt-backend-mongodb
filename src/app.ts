import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import { connectDB } from './database/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import authRouter from './routes/auth.router.js';
import taskRoutes from './routes/task.router.js';
import logger from './utils/logger.js';

// --- Imports do Swagger ---
import swaggerUi from 'swagger-ui-express';
// Importamos o 'swaggerSpec' como default
import swaggerSpec from './config/swagger.config.js';

const app = express();

app.use(cors());
app.use(express.json());

// --- Rotas ---

// Rota "raiz" para verificar se a API está online no Vercel
app.get('/', (req, res) => {
  res.send('API online 🚀. Aceda /api/docs para a documentação.');
});

// Rota da Documentação (forma simples e correta)
// O 'swaggerUi.serve' já sabe como servir os seus próprios ficheiros CSS/JS
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API
app.use('/api', authRouter);
app.use('/api/tasks', taskRoutes);

// Middleware de Erro (sempre no final)
app.use(errorMiddleware);

// --- Lógica de Conexão e Arranque ---
try {
  logger.info('🔍 Tentando conectar ao MongoDB...');

  await connectDB({
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });

  logger.info('✅ Conexão com MongoDB estabelecida!');

  // Lógica para rodar localmente (e não na Vercel)
  if (!process.env.VERCEL_ENV) {
    const port = config.port || 3000;
    app.listen(port, () =>
      logger.info(
        `🚀 Servidor local rodando na porta ${port}. Docs em http://localhost:${port}/api/docs`
      )
    );
  }
} catch (error: any) {
  logger.error('❌ Falha ao iniciar:', error.message || error);
  process.exit(1);
}

export default app;
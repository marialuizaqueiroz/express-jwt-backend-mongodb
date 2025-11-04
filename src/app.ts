import express from "express";
import cors from 'cors';
import config from "./config/index.js"; // Certifique-se que config.port não é mais necessário aqui
import { connectDB } from "./database/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.router.js";
import taskRoutes from "./routes/task.router.js"; 
import logger from "./utils/logger.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRouter);
app.use("/api/tasks", taskRoutes); 

app.use(errorMiddleware);

// --- A NOVA LÓGICA DE STARTUP PARA VERCEL ---

logger.info("🔍 Tentando conectar ao MongoDB...");

// 1. Use "Top-Level Await" para conectar
// Isto pausa a inicialização até que o banco esteja pronto.
try {
  await connectDB({
    serverSelectionTimeoutMS: 30000, 
    socketTimeoutMS: 45000, 
  });
  logger.info("✅ Conexão com MongoDB estabelecida!");

} catch (error: any) {
  logger.error("❌ Falha ao conectar ao MongoDB:", error.message || error);
  // Se o banco não conectar, falhamos o deploy
  process.exit(1); 
}

// 2. REMOVA a função startServer() e o app.listen()
//    logger.info(`🚀 Servidor rodando na porta ${config.port}`) NÃO É NECESSÁRIO

// 3. EXPORTE O 'APP' PRONTO
// O Vercel vai pegar este 'app' e iniciar o servidor para você.
export default app;
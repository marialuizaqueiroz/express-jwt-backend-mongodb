import express from "express";
import cors from 'cors';
import config from "./config/index.js"; 
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

try {
  await connectDB({
    serverSelectionTimeoutMS: 30000, 
    socketTimeoutMS: 45000, 
  });
  logger.info("✅ Conexão com MongoDB estabelecida!");

} catch (error: any) {
  logger.error("❌ Falha ao conectar ao MongoDB:", error.message || error);
  process.exit(1); 
}

export default app;
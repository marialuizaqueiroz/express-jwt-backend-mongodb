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

// --- 3. LÓGICA DE STARTUP HÍBRIDA ---
try {
  logger.info("🔍 Tentando conectar ao MongoDB...");
  
  // Conecta ao banco (necessário para ambos os ambientes)
  await connectDB({
    serverSelectionTimeoutMS: 30000, 
    socketTimeoutMS: 45000, 
  });
  
  logger.info("✅ Conexão com MongoDB estabelecida!");

  // Verificamos se NÃO estamos no Vercel
  if (!process.env.VERCEL_ENV) {
    // Se for local, e SOMENTE se for local, iniciamos o servidor
    const port = config.port || 3000; // Usa a porta do config ou 3000
    app.listen(port, () =>
      logger.info(`🚀 Servidor local rodando na porta ${port}`)
    );
  }

} catch (error: any) {
  logger.error("❌ Falha ao iniciar:", error.message || error);
  process.exit(1); 
}

// --- 4. EXPORTAÇÃO PARA O VERCEL ---
// O Vercel vai usar este 'app' pronto.
// O ambiente local vai simplesmente ignorar esta linha após o app.listen().
export default app;
import express from "express";
import cors from "cors";
import config from "./config/index.js";
import { connectDB } from "./database/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.router.js";
import taskRoutes from "./routes/task.router.js";
import logger from "./utils/logger.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.send("<h3>API online 🚀</h3>");
});

// Rotas
app.use("/api", authRouter);
app.use("/api/tasks", taskRoutes);

// Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Middleware de erro
app.use(errorMiddleware);

// Inicialização do servidor
try {
  logger.info("🔍 Tentando conectar ao MongoDB...");

  await connectDB({
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });

  logger.info("✅ Conexão com MongoDB estabelecida!");

  if (!process.env.VERCEL_ENV) {
    const port = config.port || 3000;
    app.listen(port, () =>
      logger.info(`🚀 Servidor local rodando na porta ${port}`)
    );
  }
} catch (error: any) {
  logger.error("❌ Falha ao iniciar:", error.message || error);
  process.exit(1);
}

export default app;

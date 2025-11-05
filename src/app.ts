// src/app.ts
import express from "express";
import cors from "cors";
import config from "./config/index.js";
import { connectDB } from "./database/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.router.js";
import taskRoutes from "./routes/task.router.js";
import logger from "./utils/logger.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config.js"; // IMPORT COM .js (NodeNext)

// ----- app -----
const app = express();

app.use(cors());
app.use(express.json());

// rota raiz simples
app.get("/", (_req, res) => {
  res.send("API online 🚀");
});

// expõe o JSON da spec explicitamente (útil para ambientes serverless)
app.get("/api/swagger.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Swagger UI apontando para o JSON acima (evita problemas de fetch em serverless)
app.use(
  "/api/docs",
  swaggerUi.serve,
  // usamos setup com swaggerUrl via swaggerOptions para garantir que o cliente carregue o JSON certo
  swaggerUi.setup(undefined, { explorer: true, swaggerOptions: { url: "/api/swagger.json" } })
);

// rotas da API
app.use("/api", authRouter);
app.use("/api/tasks", taskRoutes);

// middleware de erro deve ficar por último
app.use(errorMiddleware);

// Inicialização / conexão com MongoDB
try {
  logger.info("🔍 Tentando conectar ao MongoDB...");

  await connectDB({
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });

  logger.info("✅ Conexão com MongoDB estabelecida!");

  if (!process.env.VERCEL_ENV) {
    const port = config.port || 3000;
    app.listen(port, () => logger.info(`🚀 Servidor local rodando na porta ${port}`));
  }
} catch (error: any) {
  logger.error("❌ Falha ao iniciar:", error.message || error);
  process.exit(1);
}

export default app;

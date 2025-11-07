import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrigir caminho absoluto de forma segura para ESModules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API - CRUD de Usuários e Tarefas',
      version: '1.0.0',
      description:
        'Documentação da API com autenticação e tarefas. Projeto desenvolvido em Node.js + Express + TypeScript.',
    },
    servers: [
      { url: 'http://localhost:3000/api', description: 'Servidor Local' },
      {
        url: 'https://express-jwt-backend-mongodb.marialuiza.me/api',
        description: 'Servidor Produção (Vercel)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtido após login',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  // ⚠️ IMPORTANTE: usar os arquivos JS da build (dist)
  apis: [path.join(__dirname, '../../dist/routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;

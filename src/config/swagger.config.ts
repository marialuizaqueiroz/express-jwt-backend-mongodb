import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';


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
      { url: 'http://localhost:3000', description: 'Servidor Local' },
      {
        url: 'https://express-jwt-backend-mongodb.marialuiza.me',
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

  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
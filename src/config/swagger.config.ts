// import swaggerJsdoc from 'swagger-jsdoc';

// const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:8081';

// const options: swaggerJsdoc.Options = {
//   definition: {
//     openapi: '3.0.0', 
//     info: {
//       title: 'API Minha Lista de Tarefas (MongoDB)',
//       version: '1.0.0',
//       description: 'Documentação da API backend para o projeto Minha Lista de Tarefas, construída com Node.js, Express e MongoDB.',
//       contact: {
//         name: 'Maria Luiza', 
//         url: 'https://github.com/marialuizaqueiroz', 
//       },
//     },
    
//     servers: [
//       {
//         url: `${vercelUrl}/api`, 
//         description: 'Servidor de Produção (Vercel)',
//       },
//       {
//         url: 'http://localhost:3000/api', 
//         description: 'Servidor de Desenvolvimento Local',
//       },
//     ],
    
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//           description: 'Insira o token JWT (sem "Bearer ") para autenticação das rotas protegidas',
//         },
//       },
//     },
    
//     security: [], 
//   },

//   apis: ['./src/routes/*.ts'], 
// };

// const specs = swaggerJsdoc(options);

// export default specs;

import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - CRUD de Usuários e Tarefas",
      version: "1.0.0",
      description:
        "Documentação da API com autenticação e tarefas. Projeto desenvolvido em Node.js + Express + TypeScript.",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor Local",
      },
      {
        url: "https://express-jwt-backend.vercel.app/api",
        description: "Servidor em Produção (Vercel)",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")], // funciona no build do Vercel
};

export const swaggerSpec = swaggerJSDoc(options);


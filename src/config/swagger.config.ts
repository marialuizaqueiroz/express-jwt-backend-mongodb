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

// src/config/swagger.config.ts
import swaggerJSDoc from "swagger-jsdoc";

const isVercel = Boolean(process.env.VERCEL);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - CRUD de Usuários e Tarefas",
      version: "1.0.0",
      description:
        "Documentação da API do projeto com autenticação e tarefas. Projeto desenvolvido em Node.js + Express + TypeScript.",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor Local",
      },
      {
        url: `https://${process.env.VERCEL_URL ?? "express-jwt-backend.vercel.app"}/api`,
        description: "Servidor Produção (Vercel)",
      },
    ],
  },
  // inclui ambos: TS no dev e JS no dist (para produção)
  apis: isVercel ? ["./dist/routes/*.js"] : ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);


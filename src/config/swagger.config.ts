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
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API CRUD de Tarefas",
      version: "1.0.0",
      description: "Documentação da API CRUD de Tarefas com autenticação JWT",
    },
    servers: [
      {
        url: "https://express-jwt-backend.vercel.app", // URL de produção no Vercel
        description: "Servidor de produção",
      },
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // caminho dos arquivos com as anotações Swagger
};

export const swaggerSpec = swaggerJsdoc(options);

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
        url: "https://express-jwt-backend.vercel.app",
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
  // 👇 Isso é o mais importante: o caminho correto para rodar no Vercel!
  apis: ["./dist/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);

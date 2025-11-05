import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

// O 'path.resolve' garante que o caminho é absoluto a partir da raiz do projeto
const apiPaths = [
  path.resolve(process.cwd(), './src/routes/auth.router.ts'),
  path.resolve(process.cwd(), './src/routes/task.router.ts'),
];

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
        url: 'https://express-jwt-backend.vercel.app/api',
        description: 'Servidor Produção (Vercel)',
      },
    ],
    // A segurança (cadeado) é definida aqui
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT de autenticação obtido no login',
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Aplica 'bearerAuth' globalmente a todas as rotas
      },
    ],
  },
  // Diz ao swagger-jsdoc para ler os ficheiros .ts (com comentários)
  apis: apiPaths,
};

// Exportamos 'swaggerSpec' como export default para simplificar a importação
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
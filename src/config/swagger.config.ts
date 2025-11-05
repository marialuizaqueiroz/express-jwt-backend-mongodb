import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// __dirname aponta para .../dist/config/ (após compilação)
const __dirname = path.dirname(__filename);

// MUDANÇA-CHAVE: Vamos procurar os ficheiros .ts originais na pasta 'src'
// .../dist/config/ -> ../../ -> src/routes/*.ts
const apiPaths = [
  path.join(__dirname, '../../src/routes/*.ts'), // <--- A CORREÇÃO
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
        url: 'https://express-jwt-backend-mongodb-bhsl247zn.vercel.app/api',
        description: 'Servidor Produção (Vercel)',
      },
    ],
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
  },
  // Diz ao swagger-jsdoc para ler os ficheiros .ts originais
  apis: apiPaths,
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
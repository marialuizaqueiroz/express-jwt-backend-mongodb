import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url'; // Para __dirname em ESM

// Esta é a forma correta em ESM de obter o __dirname
// __filename aponta para .../dist/config/swagger.config.js (após compilação)
const __filename = fileURLToPath(import.meta.url);
// __dirname aponta para a pasta .../dist/config
const __dirname = path.dirname(__filename);

// Construímos o caminho para a pasta 'routes' compilada
// .../dist/config -> ../ -> .../dist -> /routes -> .../dist/routes
const apiPaths = [
  path.join(__dirname, '../routes/*.js'), // <--- MUDANÇA-CHAVE
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
    // NOTA: A segurança foi movida para dentro dos ficheiros de rota
    // para ser aplicada individualmente (rotas públicas vs. privadas)
  },
  // Diz ao swagger-jsdoc para ler os ficheiros .js compilados
  apis: apiPaths,
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
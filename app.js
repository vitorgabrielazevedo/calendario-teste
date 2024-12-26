import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware para processar JSON e dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', userRoutes);

// Configuração do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

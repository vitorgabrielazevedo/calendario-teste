import { Router } from 'express';
import pool from '../src/js/db.js';

const router = Router();

// Rota para cadastrar um usuário
router.post('/cadastro', async (req, res) => {
  const { nome, usuario, senha } = req.body;

  if (!nome || !usuario || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const query = `
      INSERT INTO usuarios (nome, usuario, senha) 
      VALUES ($1, $2, $3) 
      RETURNING id
    `;
    const values = [nome, usuario, senha];
    const result = await pool.query(query, values);

    res.status(201).json({ 
      message: 'Usuário cadastrado com sucesso', 
      id: result.rows[0].id 
    });
  } catch (error) {
    console.error('Erro ao inserir no banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;

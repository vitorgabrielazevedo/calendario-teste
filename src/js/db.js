import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',        
  host: 'localhost',             
  database: 'calendario',      
  password: 'pabd',          
  port: 5432,                     
});

pool.connect()
  .then(() => console.log('Conectado ao banco de dados com sucesso'))
  .catch(err => console.error('Erro de conexão:', err.stack));

export default pool;

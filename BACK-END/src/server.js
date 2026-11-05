const express = require('express');
require('dotenv').config();

const authMiddleware = require('./middlewares/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');

const app = express();
app.use(express.json());

// Rota pública de Autenticação
app.use('/', authRoutes);

// Proteção JWT global para todas as rotas declaradas abaixo
app.use(authMiddleware);

// Rotas protegidas
app.use('/clientes', clienteRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/agendamentos', agendamentoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
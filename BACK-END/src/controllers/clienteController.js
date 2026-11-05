const clienteService = require('../services/clienteService');

class ClienteController {
  async listar(req, res) {
    try {
      const { busca } = req.query;
      const clientes = await clienteService.listarTodos(busca);
      return res.status(200).json(clientes);
    } catch (err) {
      return res.status(500).json({ mensagem: 'Erro ao obter clientes' });
    }
  }

  async criar(req, res) {
    try {
      const novoCliente = await clienteService.criar(req.body);
      return res.status(201).json(novoCliente);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro ao cadastrar cliente' });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      await clienteService.atualizar(id, req.body);
      return res.status(200).json({ mensagem: 'Cliente atualizado com sucesso' });
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro ao atualizar cliente' });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await clienteService.deletar(id);
      return res.status(204).send();
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro ao remover cliente' });
    }
  }
}

module.exports = new ClienteController();
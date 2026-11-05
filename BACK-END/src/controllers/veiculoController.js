const veiculoService = require('../services/veiculoService');

class VeiculoController {
  async listar(req, res) {
    try {
      const veiculos = await veiculoService.listarTodos();
      return res.status(200).json(veiculos);
    } catch (err) {
      return res.status(500).json({ mensagem: 'Erro ao listar veículos' });
    }
  }

  async criar(req, res) {
    try {
      const novoVeiculo = await veiculoService.criar(req.body);
      return res.status(201).json(novoVeiculo);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro ao criar veículo' });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      await veiculoService.atualizar(id, req.body);
      return res.status(200).json({ mensagem: 'Veículo atualizado com sucesso' });
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro ao atualizar veículo' });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await veiculoService.deletar(id);
      return res.status(204).send();
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro ao excluir veículo' });
    }
  }
}

module.exports = new VeiculoController();
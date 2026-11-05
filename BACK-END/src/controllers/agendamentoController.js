const agendamentoService = require('../services/agendamentoService');

class AgendamentoController {
  async listar(req, res) {
    try {
      const agendamentos = await agendamentoService.listarTodos();
      return res.status(200).json(agendamentos);
    } catch (err) {
      return res.status(500).json({ mensagem: 'Erro ao listar agendamentos' });
    }
  }

  async criar(req, res) {
    try {
      const novoAgendamento = await agendamentoService.criar(req.body);
      return res.status(201).json(novoAgendamento);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro ao cadastrar agendamento' });
    }
  }

  async atualizarData(req, res) {
    try {
      const { id } = req.params;
      const { data_agendamento } = req.body;
      await agendamentoService.atualizarData(id, data_agendamento);
      return res.status(200).json({ mensagem: 'Data alterada com sucesso' });
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro ao atualizar data do agendamento' });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await agendamentoService.deletar(id);
      return res.status(204).send();
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro ao remover agendamento' });
    }
  }
}

module.exports = new AgendamentoController();
const agendamentoRepository = require('../repositories/agendamentoRepository');
const clienteRepository = require('../repositories/clienteRepository');
const veiculoRepository = require('../repositories/veiculoRepository');

class AgendamentoService {
  async listarTodos() {
    return await agendamentoRepository.findAllWithDetails();
  }

  async criar(dados) {
    const { id_cliente, id_veiculo } = dados;
    
    const cliente = await clienteRepository.findById(id_cliente);
    if (!cliente) {
      throw { status: 400, mensagem: 'Cliente informado não existe' };
    }

    const veiculo = await veiculoRepository.findById(id_veiculo);
    if (!veiculo) {
      throw { status: 400, mensagem: 'Veículo informado não existe' };
    }

    const id = await agendamentoRepository.create(dados);
    return { id_agendamento: id, ...dados };
  }

  async atualizarData(id, data_agendamento) {
    if (!data_agendamento) {
      throw { status: 400, mensagem: 'O campo data_agendamento é obrigatório' };
    }

    const agendamento = await agendamentoRepository.findById(id);
    if (!agendamento) {
      throw { status: 404, mensagem: 'Agendamento não encontrado' };
    }

    await agendamentoRepository.updateData(id, data_agendamento);
  }

  async deletar(id) {
    const agendamento = await agendamentoRepository.findById(id);
    if (!agendamento) {
      throw { status: 404, mensagem: 'Agendamento não encontrado' };
    }
    await agendamentoRepository.delete(id);
  }
}

module.exports = new AgendamentoService();
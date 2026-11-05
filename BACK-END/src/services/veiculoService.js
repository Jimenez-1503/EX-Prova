const veiculoRepository = require('../repositories/veiculoRepository');
const clienteRepository = require('../repositories/clienteRepository');

class VeiculoService {
  async listarTodos() {
    return await veiculoRepository.findAll();
  }

  async criar(dados) {
    const clienteId = dados.id_cliente || dados.cliente_id;
    if (!clienteId) {
      throw { status: 400, mensagem: 'O ID do cliente (id_cliente ou cliente_id) é obrigatório' };
    }

    const cliente = await clienteRepository.findById(clienteId);
    if (!cliente) {
      throw { status: 400, mensagem: 'Cliente informado não existe no banco' };
    }

    const payload = { ...dados, id_cliente: clienteId };
    const id = await veiculoRepository.create(payload);
    return { id_veiculo: id, ...payload };
  }

  async atualizar(id, dados) {
    const clienteId = dados.id_cliente || dados.cliente_id;
    if (!clienteId) {
      throw { status: 400, mensagem: 'O ID do cliente (id_cliente ou cliente_id) é obrigatório' };
    }

    const veiculoExistente = await veiculoRepository.findById(id);
    if (!veiculoExistente) {
      throw { status: 404, mensagem: 'Veículo não encontrado' };
    }

    const cliente = await clienteRepository.findById(clienteId);
    if (!cliente) {
      throw { status: 400, mensagem: 'Cliente informado não existe no banco' };
    }

    await veiculoRepository.update(id, { ...dados, id_cliente: clienteId });
  }

  async deletar(id) {
    const veiculoExistente = await veiculoRepository.findById(id);
    if (!veiculoExistente) {
      throw { status: 404, mensagem: 'Veículo não encontrado' };
    }
    await veiculoRepository.delete(id);
  }
}

module.exports = new VeiculoService();
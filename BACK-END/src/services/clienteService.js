const clienteRepository = require('../repositories/clienteRepository');
const { encrypt, decrypt } = require('../utils/crypto');

class ClienteService {
  async listarTodos(busca) {
    const clientes = await clienteRepository.findAll(busca);
    return clientes.map(cliente => ({
      ...cliente,
      registro_geral: decrypt(cliente.registro_geral)
    }));
  }

  async criar(dados) {
    if (!dados.nome_completo || !dados.registro_geral) {
      throw { status: 400, mensagem: 'Nome completo e registro geral são obrigatórios' };
    }

    const cpfCriptografado = encrypt(dados.registro_geral);
    const id = await clienteRepository.create({
      ...dados,
      registro_geral: cpfCriptografado
    });

    return { id_cliente: id, ...dados };
  }

  async atualizar(id, dados) {
    const clienteExistente = await clienteRepository.findById(id);
    if (!clienteExistente) {
      throw { status: 404, mensagem: 'Cliente não encontrado' };
    }

    const cpfCriptografado = dados.registro_geral 
      ? encrypt(dados.registro_geral) 
      : clienteExistente.registro_geral;

    await clienteRepository.update(id, {
      ...dados,
      registro_geral: cpfCriptografado
    });
  }

  async deletar(id) {
    const clienteExistente = await clienteRepository.findById(id);
    if (!clienteExistente) {
      throw { status: 404, mensagem: 'Cliente não encontrado' };
    }
    await clienteRepository.delete(id);
  }
}

module.exports = new ClienteService();
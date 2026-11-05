const usuarioRepository = require('../repositories/usuarioRepository');
const jwt = require('jsonwebtoken');

class AuthService {
  async login(email, senha) {
    const usuario = await usuarioRepository.findByEmail(email);

    // Linha de diagnóstico para inspecionar no terminal:
    console.log('Utilizador encontrado na BD:', usuario);

    if (!usuario || usuario.senha !== senha) {
      throw { status: 401, mensagem: 'Credenciais inválidas' };
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token, nome: usuario.nome };
  }
}

module.exports = new AuthService();
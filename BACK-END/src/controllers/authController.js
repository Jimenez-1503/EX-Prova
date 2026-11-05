const authService = require('../services/authService');

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const resultado = await authService.login(email, senha);
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.mensagem || 'Erro interno do servidor' });
    }
  }
}

module.exports = new AuthController();
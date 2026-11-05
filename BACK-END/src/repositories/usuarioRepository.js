const db = require('../config/database');

class UsuarioRepository {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    return rows[0];
  }
}

module.exports = new UsuarioRepository();
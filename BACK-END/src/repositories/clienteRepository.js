const db = require('../config/database');

class ClienteRepository {
  async findAll(busca) {
    let sql = 'SELECT * FROM Clientes';
    const params = [];
    if (busca) {
      sql += ' WHERE nome_completo LIKE ? OR registro_geral LIKE ?';
      params.push(`%${busca}%`, `%${busca}%`);
    }
    const [rows] = await db.query(sql, params);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM Clientes WHERE id_cliente = ?', [id]);
    return rows[0];
  }

  async create(cliente) {
    const { nome_completo, telefone, registro_geral, endereco } = cliente;
    const [result] = await db.query(
      'INSERT INTO Clientes (nome_completo, telefone, registro_geral, endereco) VALUES (?, ?, ?, ?)',
      [nome_completo, telefone, registro_geral, endereco]
    );
    return result.insertId;
  }

  async update(id, cliente) {
    const { nome_completo, telefone, registro_geral, endereco } = cliente;
    await db.query(
      'UPDATE Clientes SET nome_completo = ?, telefone = ?, registro_geral = ?, endereco = ? WHERE id_cliente = ?',
      [nome_completo, telefone, registro_geral, endereco, id]
    );
  }

  async delete(id) {
    await db.query('DELETE FROM Clientes WHERE id_cliente = ?', [id]);
  }
}

module.exports = new ClienteRepository();
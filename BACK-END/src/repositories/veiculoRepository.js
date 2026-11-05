const db = require('../config/database');

class VeiculoRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM Veiculos');
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM Veiculos WHERE id_veiculo = ?', [id]);
    return rows[0];
  }

  async create(veiculo) {
    const { nome_modelo, placa, tipo_modelo, id_cliente } = veiculo;
    const [result] = await db.query(
      'INSERT INTO Veiculos (nome_modelo, placa, tipo_modelo, id_cliente) VALUES (?, ?, ?, ?)',
      [nome_modelo, placa, tipo_modelo, id_cliente]
    );
    return result.insertId;
  }

  async update(id, veiculo) {
    const { nome_modelo, placa, tipo_modelo, id_cliente } = veiculo;
    await db.query(
      'UPDATE Veiculos SET nome_modelo = ?, placa = ?, tipo_modelo = ?, id_cliente = ? WHERE id_veiculo = ?',
      [nome_modelo, placa, tipo_modelo, id_cliente, id]
    );
  }

  async delete(id) {
    await db.query('DELETE FROM Veiculos WHERE id_veiculo = ?', [id]);
  }
}

module.exports = new VeiculoRepository();
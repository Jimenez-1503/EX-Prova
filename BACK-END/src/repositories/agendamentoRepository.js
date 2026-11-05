const db = require('../config/database');

class AgendamentoRepository {
  async findAllWithDetails() {
    const sql = `
      SELECT 
        a.id_agendamento,
        a.tipo_agendamento,
        a.data_agendamento,
        a.horario_agendamento,
        a.local_agendamento,
        c.id_cliente,
        c.nome_completo AS nome_cliente,
        c.telefone AS telefone_cliente,
        v.id_veiculo,
        v.nome_modelo AS modelo_veiculo,
        v.placa AS placa_veiculo
      FROM Agendamentos a
      INNER JOIN Clientes c ON a.id_cliente = c.id_cliente
      INNER JOIN Veiculos v ON a.id_veiculo = v.id_veiculo
      ORDER BY a.data_agendamento ASC, a.horario_agendamento ASC
    `;
    const [rows] = await db.query(sql);
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM Agendamentos WHERE id_agendamento = ?', [id]);
    return rows[0];
  }

  async create(agendamento) {
    const { id_cliente, tipo_agendamento, data_agendamento, local_agendamento, horario_agendamento, id_veiculo } = agendamento;
    const [result] = await db.query(
      'INSERT INTO Agendamentos (id_cliente, tipo_agendamento, data_agendamento, local_agendamento, horario_agendamento, id_veiculo) VALUES (?, ?, ?, ?, ?, ?)',
      [id_cliente, tipo_agendamento, data_agendamento, local_agendamento, horario_agendamento, id_veiculo]
    );
    return result.insertId;
  }

  async updateData(id, data_agendamento) {
    await db.query(
      'UPDATE Agendamentos SET data_agendamento = ? WHERE id_agendamento = ?',
      [data_agendamento, id]
    );
  }

  async delete(id) {
    await db.query('DELETE FROM Agendamentos WHERE id_agendamento = ?', [id]);
  }
}

module.exports = new AgendamentoRepository();
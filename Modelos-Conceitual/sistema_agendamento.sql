-- Criar o banco de dados
CREATE DATABASE sistema_agendamento_B;
 
-- Selecionar o banco de dados
USE sistema_agendamento_B;
 
-- TABELA USUARIOS
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);
 
-- TABELA CLIENTES
CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    telefone VARCHAR(20),
    registro_geral VARCHAR(255) NOT NULL,
    endereco VARCHAR(255)
);
 
-- TABELA VEICULOS
CREATE TABLE Veiculos (
    id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
    nome_modelo VARCHAR(100) NOT NULL,
    placa VARCHAR(10) NOT NULL UNIQUE,
    tipo_modelo VARCHAR(50),
    id_cliente INT NOT NULL,
 
    FOREIGN KEY (id_cliente)
    REFERENCES Clientes(id_cliente)
);
 
-- TABELA AGENDAMENTOS
CREATE TABLE Agendamentos (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    tipo_agendamento VARCHAR(100) NOT NULL,
    data_agendamento DATE NOT NULL,
    local_agendamento VARCHAR(150) NOT NULL,
    horario_agendamento TIME NOT NULL,
    id_veiculo INT NOT NULL,
 
    FOREIGN KEY (id_cliente)
    REFERENCES Clientes(id_cliente),
 
    FOREIGN KEY (id_veiculo)
    REFERENCES Veiculos(id_veiculo)
);
 
-- CLIENTES (registro_geral recebe CPFs ficticios em texto simples nesta etapa).
INSERT INTO Clientes (nome_completo, telefone, registro_geral, endereco)
VALUES
('Pedro Jimenez', '(11) 99999-1001', '123.456.789-01', 'Rua das Flores, 100 - Salto/SP'),
('Maria Oliveira', '(11) 99999-1002', '123.456.789-02', 'Avenida Brasil, 250 - Sao Paulo/SP'),
('Carlos Santos', '(11) 99999-1003', '123.456.789-03', 'Rua Central, 75 - Guarulhos/SP');
 
-- VEICULOS (cada veiculo referencia um cliente cadastrado acima).
INSERT INTO Veiculos (nome_modelo, placa, tipo_modelo, id_cliente)
VALUES
('Volkswagen Jetta', 'ABC1D23', 'Sedan', 1),
('Chevrolet Onix', 'DEF4G56', 'Hatch', 2),
('Fiat Toro', 'GHI7J89', 'Picape', 3);
 
-- AGENDAMENTOS (cada agendamento referencia um cliente e um veiculo existentes).
INSERT INTO Agendamentos
(id_cliente, tipo_agendamento, data_agendamento, local_agendamento, horario_agendamento, id_veiculo)
VALUES
(1, 'Vistoria veicular', '2027-01-15', 'Unidade Centro', '09:00:00', 1),
(2, 'Transferencia de propriedade', '2027-01-16', 'Unidade Norte', '10:30:00', 2),
(3, 'Licenciamento', '2027-01-17', 'Unidade Sul', '14:00:00', 3);
 
 SELECT * FROM Clientes;
 SELECT * FROM Veiculos;
 SELECT * FROM Agendamentos;
CREATE DATABASE livraria;
USE livraria;

DROP TABLE livros;

CREATE TABLE livros (
	id INT(10) AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    numPAGINAS INT NOT NULL,
    timestampp TIMESTAMP
);

INSERT into livros (nome, autor, numPAGINAS) values ('Bom dia venorica', 'Raphael Montes', 256),
('Uma mulher no escuro', 'Raphael Montes', 256);

CREATE DATABASE prCross;
USE prCross;

DROP TABLE pessoa;
CREATE TABLE pessoa(
 cpf VARCHAR(11) NOT NULL PRIMARY KEY,
 nome VARCHAR(50) NOT NULL,
 sobrenome VARCHAR(50) NOT NULL,
 email VARCHAR(50) NOT NULL,
 senha VARCHAR(50) NOT NULL,
 cref VARCHAR(20)
);

INSERT INTO pessoa (cpf, nome, sobrenome, email, senha) VALUES ("45417254878", "Rayla", "Souza", "rayla.chistina@gmail.com", "123456");
INSERT INTO pessoa (cpf, nome, sobrenome, email, senha) VALUES ("12345678910", "Danilo", "Bertelli", "danilobertelli@gmail.com", "123456");
SELECT * FROM pessoa;

DROP TABLE grupo;
CREATE TABLE grupo(
	idGrupo INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    ativo BOOLEAN, 
    nome VARCHAR(50) NOT NULL
);

INSERT INTO grupo (ativo, nome) VALUES (true, "Treino box");
INSERT INTO grupo (ativo, nome) VALUES (true, "Treino das meninas");
SELECT grupo.ativo, grupo.nome FROM grupo;

SELECT * from pessoa_has_grupo;

DROP TABLE treino;
CREATE TABLE treino(
	idTreino INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    tempo DOUBLE,
    tipo VARCHAR(20),
    rounds INT, 
    descanso DOUBLE,
    ativo DOUBLE,
    descricao VARCHAR(100),
    treino LONGTEXT,
    nivel VARCHAR(50)
);
INSERT INTO treino (nome, tipo, descricao, treino, nivel) VALUES ("Murph", "FORTIME", "Completar no minimo tempo possivel","- 1 milha run - 100 pull ups - 200 push ups - 300 squats - 1 milha run", "treino");
INSERT INTO treino (nome, tempo, tipo, descricao, treino, nivel) VALUES ("CINDY", 20, "AMRAP", "Fazer o maximo de rounds possiveis em 20 minutos","- 5 pull ups - 10 push ups - 15 squats", "treino");
INSERT INTO treino (nome, tempo, tipo, descricao, treino, nivel) VALUES ("AQUECIMENTO", 8, "AMRAP", "Fazer o maximo de rounds possiveis em 8 minutos","- 5 sit up - 5 push ups - 5 squats", "aquecimento");
select * from treino ORDER BY idTreino DESC;

select treino.nome, treino.tempo, treino.tipo, treino.rounds, treino.descanso, treino.ativo, treino.descricao, treino.treino, treino.nivel from treino join grupo_has_treino on grupo_has_treino.dataTreino = "2021-01-13" and grupo_idGrupo = 2 and idTreino = treino_idTreino;

DROP TABLE pessoa_has_grupo;
CREATE TABLE pessoa_has_grupo(
	pessoa_cpf VARCHAR(45),
    grupo_idGrupo INT,
    
    FOREIGN KEY(pessoa_cpf) REFERENCES pessoa(cpf),
    FOREIGN KEY(grupo_idGrupo) REFERENCES grupo(idGrupo)
);

INSERT INTO pessoa_has_grupo (pessoa_cpf, grupo_idGrupo) VALUES ("45417254878", 1);
INSERT INTO pessoa_has_grupo (pessoa_cpf, grupo_idGrupo) VALUES ("45417254878", 2);
INSERT INTO pessoa_has_grupo (pessoa_cpf, grupo_idGrupo) VALUES ("12345678910", 1);

DROP TABLE grupo_has_treino;
CREATE TABLE grupo_has_treino(
	grupo_idGrupo INT,
    treino_idTreino INT,
	dataTreino TIMESTAMP NOT NULL,
    
    FOREIGN KEY(grupo_idGrupo) REFERENCES grupo(idGrupo),
    FOREIGN KEY(treino_idTreino) REFERENCES treino(IdTreino)
);

select * from grupo_has_treino;

INSERT INTO grupo_has_treino (grupo_idGrupo, treino_idTreino, dataTreino) VALUES (1, 1, "2021-01-13");
INSERT INTO grupo_has_treino (grupo_idGrupo, treino_idTreino, dataTreino) VALUES (1, 2, "2021-01-13");
INSERT INTO grupo_has_treino (grupo_idGrupo, treino_idTreino, dataTreino) VALUES (2, 2, "2021-01-13");
INSERT INTO grupo_has_treino (grupo_idGrupo, treino_idTreino, dataTreino) VALUES (2, 1, "2021-01-14");
INSERT INTO grupo_has_treino (grupo_idGrupo, treino_idTreino, dataTreino) VALUES (1, 1, "2021-01-14");
INSERT INTO grupo_has_treino (grupo_idGrupo, treino_idTreino, dataTreino) VALUES (1, 2, "2021-01-14");
INSERT INTO grupo_has_treino (grupo_idGrupo, treino_idTreino, dataTreino) VALUES (1, 3, "2021-01-14");


module.exports = {
    //AUTH
    getLogin: function(email, senha, connection, callback){
        let sql = `select email from pessoa where email = '${email}' && senha = '${senha}'`;
        connection.query(sql, callback);
    },

    //PESSOAS
    setPerson: function(person, connection, callback){
        let sql = 'insert into pessoa set ?';
        connection.query(sql, person, callback);
    },

    getAllPerson: function(connection, callback){
        let sql = 'SELECT cpf as id, nome, sobrenome FROM pessoa ;';
        connection.query(sql, callback);
    },

    //GRUPOS
    getGrupos: function(connection, callback){
        let sql = "SELECT * FROM grupo;";
        connection.query(sql, callback);
    },

    setGroup: function(group, connection, callback){
        let sql = 'insert into grupo set ?';
        connection.query(sql, group, callback);
    },

    setPersonForGroup: function(data, connection, callback){
        let sql = 'insert into pessoa_has_grupo set ?';
        connection.query(sql, data, callback)
    },

    deleteGroup: function(idGroup, connection, callback){
        let sql = `delete from grupo where idGrupo ='${idGroup}'`;
        connection.query(sql, callback);
    },

    deletePersonHasGroup: function(idGroup, connection, callback){
        let sql = `delete from pessoa_has_grupo where grupo_idGrupo ='${idGroup}'`;
        connection.query(sql, callback);
    },

    //TREINO
    getTreinoForGroup: function(connection, groupId, date, callback){
       let sql = `select grupo_has_treino.grupo_idGrupo, grupo_has_treino.treino_idTreino, treino.nome, treino.tempo, treino.tipo, treino.rounds, treino.descanso, treino.ativo, treino.descricao, treino.treino, treino.nivel from treino join grupo_has_treino on grupo_has_treino.dataTreino = '${date}' and grupo_idGrupo ='${groupId}' and idTreino = treino_idTreino;`;
        connection.query(sql, callback);
    },

    getTreinoById: function(connection, idTreino, callback){
        let sql = `select * from treino where idTreino = '${idTreino}';`;
         connection.query(sql, callback);
     },

    getTreino: function(connection, callback){
        let sql = `select * from treino ORDER BY idTreino DESC;`;
         connection.query(sql, callback);
     },

    setTreino: function(treino, connection, callback){
        let sql = 'insert into treino set ?';
        connection.query(sql, treino, callback)
    },

    setTreinoForGroup: function(data, connection, callback){
        let sql = 'insert into grupo_has_treino set ?';
        connection.query(sql, data, callback)
    },

    deleteTreinoForGroup: function(idTreino, idGroup, connection, callback){
        let sql = `delete from grupo_has_treino where grupo_idGrupo ='${idGroup}' AND treino_idTreino = '${idTreino}';`;
        connection.query(sql, callback);
    },

    deleteTreino: function(idTreino, connection, callback){
        let sql = `delete from treino where idTreino = '${idTreino}';`;
        connection.query(sql, callback);
    },

    updateTreino: function(treino, connection, callback){
        let sql = `UPDATE treino SET nome = '${treino.nome}',tempo = '${treino.tempo}', tipo = '${treino.tipo}', descricao = '${treino.descricao}', treino = '${treino.treino}', nivel = '${treino.nivel}' WHERE idTreino = '${treino.idTreino}';`;
        connection.query(sql, callback);
    }
}

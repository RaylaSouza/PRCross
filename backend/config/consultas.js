module.exports = {
    //GRUPOS
    getGrupos: function(connection, callback){
        let sql = "SELECT * FROM grupo;";
        connection.query(sql, callback);
    },

    setGroup: function(group, connection, callback){
        let sql = 'insert into grupo set ?';
        connection.query(sql, group, callback);
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

module.exports = {
    getGrupos: function(connection, callback){
        let sql = "SELECT * FROM grupo;";
        connection.query(sql, callback);
    },

    getTreinoForGroup: function(connection, groupId, date, callback){
       let sql = `select treino.nome, treino.tempo, treino.tipo, treino.rounds, treino.descanso, treino.ativo, treino.descricao, treino.treino, treino.nivel from treino join grupo_has_treino on grupo_has_treino.dataTreino = '${date}' and grupo_idGrupo ='${groupId}' and idTreino = treino_idTreino;`;
        connection.query(sql, callback);
    },

    getTreino: function(connection, callback){
        let sql = `select * from treino ORDER BY idTreino DESC;`;
         connection.query(sql, callback);
     },

    setGroup: function(group, connection, callback){
        let sql = 'insert into grupo set ?';
        connection.query(sql, group, callback);
    },

    setTreino: function(treino, connection, callback){
        let sql = 'insert into treino set ?';
        connection.query(sql, treino, callback)
    },

    setTreinoForGroup: function(data, connection, callback){
        let sql = 'insert into grupo_has_treino set ?';
        connection.query(sql, data, callback)
    },
}

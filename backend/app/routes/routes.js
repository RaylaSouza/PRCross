const dbConnection = require("../../config/dbConnection");
const connection = dbConnection();
const Joi = require('joi');


const consultas = require('../../config/consultas')

module.exports = {
    //PESSOAS
    roteInsertPerson: function(app) {
        app.post("/register", function(req, res) {
            consultas.setPerson(req.body, connection, function(err, results) {
                if(err){
                    return res.status(200).send({
                        error: true,
                        message: err.sqlMessage,
                        code: err.code,
                    });
                } else if (results.affectedRows <= 0){
                    return res.status(200).send({
                        error: true,
                        message: "Não foi possivel cadastrar usuário"
                    });
                } else {
                    res.status(200).send(JSON.stringify(req.body, null, 3));
                }
            })
        });
    },

    //GRUPOS
    roteInsertGroup: function(app) {
        app.post("/workout/days/newGroup", function(req, res) {
            consultas.setGroup(req.body, connection, function(err, results) {
                res.status(200).send(JSON.stringify(req.body, null, 3));
            })
        });
    },

    //TREINOS
    roteWorkout: function(app) {
        app.get("/workout", function(req, res) {
            consultas.getGrupos(connection, function(err, results) {
                res.status(200).send(JSON.stringify(results, null, 3));
            })
        });
    },

    roteWorkoutDay: function(app) {
        app.get("/workout/days/:id/:date", function(req, res) {
            consultas.getTreinoForGroup(connection, parseInt(req.params.id), req.params.date, function(err, results) {
                res.status(200).send(JSON.stringify(results, null, 3));
            })
        });
    },

    roteWorkoutById: function(app) {
        app.get("/workout/:id/", function(req, res) {
            consultas.getTreinoById(connection, parseInt(req.params.id), function(err, results) {
                res.status(200).send(JSON.stringify(results, null, 3));
                // err ? res.send(err): res.send('OK');
            })
        });
    },

    roteInsertWorkwoutForGroup: function(app) {
        app.post("/workout/days/newWorkout", function(req, res) {
            let idTreino;
            let data = '';
            let idGrupo;
            consultas.setTreino(req.body.exercicios, connection, function(err, results) {
                console.log(req.body.exercicios);
                idGrupo = req.body.group.idGroup;
                data = req.body.group.data;
                consultas.getTreino(connection, function(err, results) {
                    idTreino = JSON.stringify(results[0].idTreino);
                    const schema = {
                        grupo_idGrupo: idGrupo,
                        treino_idTreino: parseInt(idTreino),
                        dataTreino: data,
                    };
                    consultas.setTreinoForGroup(schema, connection, function(err, results) {})
                })
            });
            res.status(200).send(JSON.stringify(req.body, null, 3));
        });
    },

    roteDeleteWorkwoutForGroup: function(app) {
        app.delete("/workout/days/:idTreino/:idGroup", function(req, res) {
            console.log(req.params);
            consultas.deleteTreinoForGroup(parseInt(req.params.idTreino), parseInt(req.params.idGroup), connection, function(err, result) {
                consultas.deleteTreino(parseInt(req.params.idTreino), connection, function(err, results) {
                    if (results.error){
                        return res.status(400).send(result.error.details[0].message);
                    }
                })
                if (result.error){
                    return res.status(400).send(result.error.details[0].message);
                }
            })
            res.status(200).send(JSON.stringify(null, 3));
        });
    },

    roteUpdateWorkwout: function(app) {
        app.post("/workout/days", function(req, res) {
            // console.log(res, req, 'BODY');
            consultas.updateTreino(req.body.exercicios, connection, function(err, results) {
                // console.log(err, results, 'ERROR');
                console.log(results, 'status');
                if (results.error || results.affectedRows <= 0){
                    return res.status(200).send({
                        error: true,
                        message: "Não foi possivel fazer a edição dos campos"
                    });
                } else {
                    return res.status(200).send(JSON.stringify(req.body, null, 3));
                }
            });
        });
    },
};
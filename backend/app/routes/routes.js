const dbConnection = require("../../config/dbConnection");
const connection = dbConnection();
const Joi = require('joi');


const consultas = require('../../config/consultas')

module.exports = {
    //AUTH
    roteLogin: function(app) {
        app.post("/login", function(req, res) {
            consultas.getLogin(req.body.email, req.body.senha, connection, function(err, results) {
                if(results[0] !== undefined){
                    res.status(200).send(JSON.stringify(results, null, 3));
                } else {
                    return res.status(200).send({
                        error: true,
                        message: "Usuário ou senha incorretos"
                    });
                }
            })
        });
    },

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

    roteGetAllPerson: function(app) {
        app.get("/person", function(req, res) {
            consultas.getAllPerson(connection, function(err, results) {
                if(results[0] !== undefined){
                    res.status(200).send(JSON.stringify(results, null, 3));
                } else {
                    return res.status(200).send({
                        error: true,
                        message: "Não existem usuários"
                    });
                }
            })
        });
    },

    //GRUPOS
    roteInsertGroup: function(app) {
        var cont;
        app.post("/workout/days/newGroup", function(req, res) {
            const group = {
                nome: req.body.group.nome,
                ativo: true,
            };
            consultas.setGroup(group, connection, function(err, results3) {
                if(results3.error || results3.affectedRows <= 0){
                    return res.status(200).send({
                        error: true,
                        message: "Não foi possivel criar esse grupo"
                    });
                } else {
                    req.body.group.pessoas.forEach(element => {
                        const person = {
                            pessoa_cpf: element,
                            grupo_idGrupo: results3.insertId,
                        };
                        consultas.setPersonForGroup(person, connection, function(err, results) {
                            if(results.error || results.affectedRows <= 0){
                                consultas.deleteGroup(results3.insertId, connection, function(err, results) {
                                    res.status(200).send(JSON.stringify(results, null, 3));
                                })
                                return res.status(200).send({
                                    error: true,
                                    message: "Não foi inserir as pessoas no grupo"
                                });
                            } else {
                                cont++;
                            }
                        })
                    });
                    if(cont === req.body.group.pessoas.lenght){
                        return res.status(200).send({
                            error: false,
                            message: "Grupo inserido com sucesso"
                        });
                    } else {
                        return res.status(200).send({
                            error: true,
                            message: "Não foi inserir o grupo"
                        });
                    }
                }
            })
        });
    },
    
    roteWorkout: function(app) {
        app.get("/workout", function(req, res) {
            consultas.getGrupos(connection, function(err, results) {
                res.status(200).send(JSON.stringify(results, null, 3));
            })
        });
    },

    roteDeleteGroup: function(app) {
        app.delete("/group/:idGroup", function(req, res) {
            consultas.deletePersonHasGroup(parseInt(req.params.idGroup), connection, function(err, result) {
                console.log(err);
                if (result.affectedRows <= 0){
                    return res.status(200).send({
                        error: true,
                        message: "Não foi possivel excluir as pessoas desse grupo"
                    });
                } else {
                    consultas.deleteGroup(parseInt(req.params.idGroup), connection, function(err, result) {
                        console.log(err);
                        if (result.affectedRows <= 0){
                            return res.status(200).send({
                                error: true,
                                message: "Não foi possivel excluir esse grupo"
                            });
                        } else {
                            return res.status(200).send({
                                error: false,
                                message: "Grupo excluido com sucesso"
                            });
                        }
                    })
                }
            });
        });
    },

    //TREINOS
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
            })
        });
    },

    roteInsertWorkwoutForGroup: function(app) {
        app.post("/workout/days/newWorkout", function(req, res) {
            let idTreino;
            let data = '';
            let idGrupo;
            consultas.setTreino(req.body.exercicios, connection, function(err, results) {
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
            consultas.updateTreino(req.body.exercicios, connection, function(err, results) {
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
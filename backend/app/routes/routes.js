const dbConnection = require("../../config/dbConnection");
const connection = dbConnection();
const Joi = require('joi');


const consultas = require('../../config/consultas')

module.exports = {
  roteWorkout: function (app) {
    app.get("/workout", function (req, res) {
      consultas.getGrupos(connection, function(err, results){
        res.status(200).send(JSON.stringify(results, null, 3));
      })
    });
  },

  roteWorkoutDay: function (app) {
    app.get("/workout/days/:id/:date", function (req, res) {
      consultas.getTreinoForGroup(connection, parseInt(req.params.id), req.params.date, function(err, results){
        res.status(200).send(JSON.stringify(results, null, 3));
      })
    });
  },

  roteInsertWorkwoutForGroup: function (app) {
    app.post("/workout/days/newWorkout", function (req, res) {
      let idTreino;
      let data = '';
      let idGrupo;
      consultas.setTreino(req.body.treino, connection, function(err, results){
        idGrupo = req.body.group.idGroup;
        data = req.body.group.data;
        consultas.getTreino(connection, function(err, results){
          idTreino = JSON.stringify(results[0].idTreino);
          const schema = {
            grupo_idGrupo: idGrupo,
            treino_idTreino: parseInt(idTreino),
            dataTreino: data,
          };
          consultas.setTreinoForGroup(schema, connection, function(err, results){})
        })
      });
      res.status(200).send(JSON.stringify(req.body, null, 3));
    });
  },

  roteInsertGroup: function (app) {
    app.post("/workout/days/newGroup", function (req, res) {
      consultas.setGroup(req.body, connection, function(err, results){
        res.status(200).send(JSON.stringify(req.body, null, 3));
      })
    });
  },

};

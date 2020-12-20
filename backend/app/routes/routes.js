
module.exports = {
  roteWorkout: function (app) {
    app.get("/workout", function (req, res) {
      console.log('ROTA WORKOUT');
    });
  },

  roteWorkoutDay: function (app) {
    app.get("/workout/days", function (req, res) {
      console.log('ROTA WORKOUT DAYS');
    });
  },

};

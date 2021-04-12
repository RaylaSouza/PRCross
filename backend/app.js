let app = require("./config/server");
const rotas = require("./app/routes/routes");

//PESSOAS
rotas.roteInsertPerson(app);

//GRUPOS
rotas.roteInsertGroup(app);

//TREINOS
rotas.roteWorkout(app);
rotas.roteWorkoutDay(app);
rotas.roteInsertWorkwoutForGroup(app);
rotas.roteDeleteWorkwoutForGroup(app);
rotas.roteUpdateWorkwout(app);
rotas.roteWorkoutById(app);


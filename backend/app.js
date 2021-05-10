let app = require("./config/server");
const rotas = require("./app/routes/routes");

//AUTH
rotas.roteLogin(app);

//PESSOAS
rotas.roteInsertPerson(app);
rotas.roteGetAllPerson(app);

//GRUPOS
rotas.roteWorkout(app);
rotas.roteInsertGroup(app);
rotas.roteDeleteGroup(app);

//TREINOS
rotas.roteWorkoutDay(app);
rotas.roteInsertWorkwoutForGroup(app);
rotas.roteDeleteWorkwoutForGroup(app);
rotas.roteUpdateWorkwout(app);
rotas.roteWorkoutById(app);


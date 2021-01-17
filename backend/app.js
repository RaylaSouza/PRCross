let app = require("./config/server");
const rotas = require("./app/routes/routes");

rotas.roteWorkout(app);
rotas.roteWorkoutDay(app);
rotas.roteInsertWorkwoutForGroup(app);
rotas.roteInsertGroup(app);


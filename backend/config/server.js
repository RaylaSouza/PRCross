let express = require('express');
let cors = require('cors')
let app = express();
let port = 7000;

app.use(express.json());
app.use(cors())

app.listen(port, function () {
  console.log("Servidor rodando na porta", port);
});

module.exports = app;

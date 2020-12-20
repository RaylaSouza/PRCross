let express = require('express');
let app = express();
let port = 7000;

app.use(express.static("public"));

app.listen(port, function () {
  console.log("Servidor rodando na porta", port);
});

module.exports = app;

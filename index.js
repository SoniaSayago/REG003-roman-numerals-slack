const express = require("express");
const routes = require("./routes");
const app = express();

// configuración de api rest
app.set('port', process.env.PORT || 3000);

// enrutador de la api
app.use(require('./routes/routes'));


// comenzar el servidor
app.listen(app.get('port'), ()=> {
  console.log(`server on port ${app.get('port')}`);
})
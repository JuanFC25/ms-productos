const express = require("express");
const app = express();

app.set("port", 3000);

//Routes
app.use(require("./src/routes/categoriaRoutes.mjs"));

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});

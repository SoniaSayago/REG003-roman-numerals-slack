const express = require("express");

const { port } = require("./config");
const app = express();

app.get("/", (req,res) => {
res.send("hello world")
});

app.listen(port, () => {
  console.info(`App listening on port ${port}`);
});
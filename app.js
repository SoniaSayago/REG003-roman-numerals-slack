const express = require('express');
const indexRouter = require('./routes/index');
const pkg = require('./package.json');
const { port } = require('./config');

const app = express();

app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(indexRouter);

const server = app.listen(port, () => {
  console.info(`App listening on port ${port}`);
});

module.exports = { app, server };

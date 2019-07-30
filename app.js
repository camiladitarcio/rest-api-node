const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const carsRoutes = require("./routes/car");
const clientRoutes = require("./routes/client");
const authRoutes = require('./routes/auth');
const middleware = require('./middleware');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/car',middleware.checkToken, carsRoutes);
app.use('/client',middleware.checkToken, clientRoutes);
app.use('/auth', authRoutes);

app.listen(3000);

module.exports = app;
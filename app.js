const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const carsRoutes = require("./routes/car");
const clientRoutes = require("./routes/client");
const authRoutes = require('./routes/auth');
const swaggerFile = require('./docs/swagger.json');
const swaggerDoc = require('swagger-ui-express');
const middleware = require('./middleware');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/car',middleware.checkToken, carsRoutes);
app.use('/client', clientRoutes);
app.use('/auth', authRoutes);
app.use('/docs', swaggerDoc.serve, swaggerDoc.setup(swaggerFile));

app.get('', (req, res) => res.send('Welcome to Ditar Api, Enjoy!!!!!!!!!!'))

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server listen to: ", port)
});

module.exports = app;
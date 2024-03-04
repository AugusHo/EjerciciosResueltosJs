const express = require('express');

/*const { auth } = require("express-oauth2-jwt-bearer");*/
const errorHandler = require('./middleware/errorHandler');

/*const autenticacion = auth({
    audience: "http://127.0.0.1:3000/",
    issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
    tokenSigningAlg: "RS256",
});*/

const app = express();
app.use(express.json());

const librosRouter = require('./routes/libros');

app.use('/librosv2', librosRouter);

app.use(errorHandler);
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
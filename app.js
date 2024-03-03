const express = require('express');
const app = express();
app.use(express.json());

//importo el router libros
const librosRouter = require('./routes/libros.js');

//importo el middleware error handler
const errorHandler = require('./middleware/errorHandler.js');

app.use('/libros', librosRouter);

app.use(errorHandler);
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
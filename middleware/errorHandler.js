const errorHandler = (err, req, res, next) => {
    //Verificar si el error tiene un código de estado definido,sino establecer el código de estado predeterminado
    const statusCode = err.statusCode || 500;

    //objeto de respuesta al error
    const errorResponse = {
        error: {
            message: err.message || "Error interno del servidor",
            code: err.code || "internal_error",
        },
    };

    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
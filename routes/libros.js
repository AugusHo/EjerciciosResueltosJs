const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenExtractorMiddleware = require('../middleware/tokenExtractor');
const Libro = require('../models/Libro');

/* Importamos la librería para validar scopes
const { requiredScopes } = require("express-oauth2-jwt-bearer");
*/

//Por problemas en el paso a paso cambie la libreria "express-oauth2-jwt-bearer" por "jsonwebtoken"; y por ende cambie la requiredScopes("read:libros") por tokenExtractorMiddleware

router.post('/token', (req, res, next) => {
    try {
        const token = jwt.sign({ logeado: true }, 'contra', {expiresIn: "7d"});
        return res.status(200).json({token});
    } catch (error) {
        next(error);
    }
});


//Metodos crud
//ruta que devuelve la lista completa de libros
router.get('/', tokenExtractorMiddleware , async (req, res) => {

    if (!req.decodedToken || !req.decodedToken.logeado) {
        return res.status(401).json({ error: "Token no válido" });
    }

    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({error: "Error en la obtencion de los libros."})
    }
});

//ruta que devuelve los detalles de un libro específico según su ID.
router.get('/:id', tokenExtractorMiddleware, async (req, res) => {

    if (!req.decodedToken || !req.decodedToken.logeado) {
        return res.status(401).json({ error: "Token no válido" });
    }

    try {
        const result = await Libro.findOne({ _id: req.params.id });

        if (!result) {
            return res.status(404).json({error: "Error en la obtencion del libro."})
        };
        res.json(result);

    } catch (error) {
        res.status(404).json({error: "Error en la obtencion del libro."})
    }
});


//ruta para crear un libro.
router.post('/', tokenExtractorMiddleware ,async (req, res) => {

    if (!req.decodedToken || !req.decodedToken.logeado) {
        return res.status(401).json({ error: "Token no válido" });
    }
    
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({error: "Error en la creacion del libro."})
    }
});


//ruta para actualizar un libro existente.
router.put('/:id', tokenExtractorMiddleware,async (req, res) => {

    if (!req.decodedToken || !req.decodedToken.logeado) {
        return res.status(401).json({ error: "Token no válido" });
    }

    try {
        const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body,
        {
        new: true,
        });

        //{new: true} Es una opción de Mongoose que devuelve el documento actualizado, Si no se proporciona esta opción o se establece en false, Mongoose devolverá el documento antes de la actualización.
        res.json(Libro);
        } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error al actualizar el libro o el libro no existe.'})
    }
});


//ruta para eliminar un libro existente.
router.delete('/:id',tokenExtractorMiddleware , async (req, res) => {

    if (!req.decodedToken || !req.decodedToken.logeado) {
        return res.status(401).json({ error: "Token no válido" });
    }

    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({message: 'Libro eliminado correctamente.'});
    } catch (error) {
        
    }
});

module.exports = router;
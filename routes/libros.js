const express = require('express');
const router = express.Router();

const Libro = require('../models/Libro');

//Metodos crud

//ruta que devuelve la lista completa de libros
router.get('/', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({error: "Error en la obtencion de los libros."})
    }
});

//ruta que devuelve los detalles de un libro específico según su ID.
router.get('/:id', async (req, res) => {

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
router.post('/', async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({error: "Error en la creacion del libro."})
    }
});


//ruta para actualizar un libro existente.
router.put('/:id', async (req, res) => {
    try {
        const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body,
        {
        new: true,
        });

        //{new: true} Es una opción de Mongoose que devuelve el documento actualizado, Si no se proporciona esta opción o se establece en false, Mongoose devolverá el documento antes de la actualización.
        res.json(Libro);
        } catch (error) {
        res.status(500).json({error: 'Error al actualizar el libro o el libro no existe.'})
    }
});


//ruta para eliminar un libro existente.
router.delete('/:id', async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({message: 'Libro eliminado correctamente.'});
    } catch (error) {
        
    }
});

module.exports = router;
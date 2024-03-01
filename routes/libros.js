const express = require('express');
//Inicializamos el router
const router = express.Router();
const libros = require('../data');
const Joi = require('joi');
const { error } = require('console');

const libroSchema = Joi.object({
    titulo: Joi.string().required().label('Título'),
    autor: Joi.string().required().label('Autor')
});

//Obtener todos los libros, anda
router.get('/', (req, res, next) => {
    try{
        res.json(libros);
    } catch (err) {
        next(err);
    }
});

//Obtener x Id, anda
router.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        //.find((l) => l.id === id) es como aplicar un for buscando el parametro de la url l y comparandolo con cada objeto libro
        const libro = libros.find((l) => l.id === id);
    
        if (!libro) {
            return res.status(404).json({error: error.message})
        };

        res.json(libro);
    } catch (err) {
        next(err)
    }
});

// Crear un libro
router.post('/', (req, res, next) => {
    try {
        //desectruracion de la validacion del schema 
        const { error, value } = libroSchema.validate(req.body);
        if (error) {
            return res.status(400).json({error: error.message});
        }

        //desectruracion del libro
        const { titulo, autor } = value;
        const nuevoLibro = {
            id: libros.length + 1,
            titulo,
            autor
        };
        libros.push(nuevoLibro);
        res.status(201).json(nuevoLibro);

    } catch (err) {
        next(err);
    }
});

//Actualizar libro
router.put('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const { error, value } = libroSchema.validate(req.body);

        if (error) {
            return res.status(400).json({error: error.message});
        };

        const { titulo, autor } = value;

        const libro = libros.find((l) => l.id === id )

        if (!libro) {
            return res.status(404).json({error: error.message});
        };

        libro.titulo = titulo || libro.titulo;
        libro.autor = autor || libro.autor;

        res.json(libro);

    } catch (error) {
        next(error);
    }
});

//Eliminar un libro
router.delete('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        //un buscador que si encuentra un libro con ese id, devuelve el índice de ese libro y sino devuelve -1
        const index = libros.findIndex((l) => l.id === id);
    
        if (index === -1) {
            return res.status(404).json({error: error.message});
        }; 

        //elimina un elemento en la posicion index y el segundo argumento 1, indica que se eliminará un solo elemento en esa posición.
        const libroEliminado = libros.splice(index, 1);
        // 'libroEliminado' es un arreglo que contiene los elementos eliminados por la operación splice(), se envía el primer elemento de este arreglo como respuesta al cliente en formato JSON.
        res.json(libroEliminado[0]);
    } catch (error) {
        next(error)
    }
});

module.exports = router;
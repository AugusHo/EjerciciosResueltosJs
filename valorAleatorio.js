// Llamo al paquete Chance
const Chance = require('chance');

// Realizo una instancia de chance, readline no la necesita
const chance = new Chance();

// Funcion que devuelve un valor aleatorio
const valorAleatorio = () => {
    const random = chance.d100(0, 100);
    return random;
};

module.exports = { valorAleatorio };
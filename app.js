// Llamo a las dependencias de readline y a la funcion valorAleatorio
const readlineSync = require('readline-sync');
const { valorAleatorio } = require('./valorAleatorio');

//Aplicacion adivina_numero_secreto
const adivinaNumeroSecreto = () => {
    const valor = valorAleatorio();
    //console.log("El numero aleatorio es " + valor);
    let op = readlineSync.question("Elija un numero: ");
    //console.log("El numero ingresado es " + op);

    while (op != valor) {
        if (op < valor) {
            console.log(`${op} es más bajo.`);
        } else {
            if ( op > valor) {
                console.log(`${op} es más alto.`);
            }
        }

        // Recordar no poner el let porque la variable ya esta definida.
        op = readlineSync.question("Elija un numero: ");
    }

    if (op == valor) {
        console.log(`Felicidades!!! ${op} es el valor aleatorio.`);
    }
};

adivinaNumeroSecreto();

//Subirlo a GitHub
const readlineSync = require('readline-sync');

//Funciones de app.js
const registrarEstudiante = () => {
    //1)Permitir al usuario ingresar la cantidad de estudiantes que desea registrar
    // 1.5) Instalar el paquete readlineSync
    let numeroEstudiante = readlineSync.question("Numero de estudiantes a ingresar: ");
    console.log("Iniciando Registro de Estudiantes.\nSe ingresaron: " + numeroEstudiante + " estudiantes.\n");
    let listaA = [];
    
    for (let i=0; i < numeroEstudiante; i++) {
        //2)Solicitar al usuario que ingrese los nombres y edades de los estudiantes.
        let nombreA = readlineSync.question("Nombre estudiante " + (i+1) + ": ");
        let edadA = readlineSync.question("Edad estudiante " + (i+1) + ": ");
        
        let alumno = {
            nombre: nombreA,
            edad: edadA
        };
        
        listaA.push(alumno);
    }
    return listaA;
};

const mostrarLista = (lista) => {
    console.log("\n\nInicio de Lista.\n")
    for (let i=0; i < lista.length; i++) {
        let indiceA  = lista[i];
        console.log("Numero:" + (i+1) + "; Nombre:" + indiceA.nombre + "; Edad:" + indiceA.edad + "\n")
    }
    console.log("Fin de la Lista.")
};

module.exports = { registrarEstudiante, mostrarLista };
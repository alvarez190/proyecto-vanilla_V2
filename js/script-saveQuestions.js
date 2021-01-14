function getCookie(nombreCookie) {
    let arrayCookie = document.cookie.split(";");

    // Array donde coloco el nombre de la cookie como clave con su valor correspondiente
    let arrayValor = new Array();
    for (let dato of arrayCookie) {
        let [nombre, valor] = dato.split("=");
        arrayValor[nombre] = valor;
    }
    return arrayValor[nombreCookie];
}

function setCookie(nombre = "datos", valor, caducidad = 30) {
    let fecha = new Date();
    fecha.setTime(fecha.getTime() + caducidad * 60 * 60 * 1000);
    let expiracion = "expires=" + fecha.toUTCString();

    document.cookie = nombre + "=" + valor + ";" + expiracion + ";path=/";
}

// Recogo el dato enviado por el link que es el nombre.
let cadVariables = location.search.substring(1, location.search.length);
let arrVariables = cadVariables.split("&");

for (i = 0; i < arrVariables.length; i++) {
    var arrVariableActual = arrVariables[i].split("=");
}

var idUser = arrVariableActual[1];
var bd = JSON.parse(getCookie("datos"));
var user;
var arrQuestion;
var codeId;
var status = "ok";

for (const key in bd.usuarios) {
    if (bd.usuarios[key].id == idUser) {
        codeId = key;
        user = bd.usuarios[key];
        arrQuestion = bd.usuarios[key].questions;
        break;
    }
}

/*************************************/

function saveQuestion(bd, codeId, dataQuest) {
    try {
        document.getElementById("cargando").style.display = "block";
        document.getElementById("cargando").innerHTML = "Guardando....";
        setTimeout(() => {
            document.getElementById("cargando").style.display = "none";

            bd.usuarios[codeId].questions.push(dataQuest);
            setCookie("datos", JSON.stringify(bd));
            showQuestion(dataQuest);
        })
    } catch (error) {
        status = "error"
        showQuestion(dataQuest);
    }
}

var table = document.getElementById('register');

function printQuestionsSaved(arrayQuest) {
    try {
        for (const quest of arrayQuest) {
            let fila = document.createElement("tr");
            for (const key in quest) {
                var celda = document.createElement("td");
                var textoCelda = document.createTextNode(quest[key]);
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
            }
            document.getElementById("questions").appendChild(fila);
        }
    } catch (error) {
        console.log("No se ha encontrado preguntas registradas con el usuario ingresado");
    }
};

function showQuestion(question) {
    let fila = document.createElement("tr");
    for (const key in question) {
        if (Object.hasOwnProperty.call(question, key)) {
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(question[key]);
            celda.appendChild(textoCelda);
            fila.appendChild(celda);
        }
    }
    document.getElementById("questions").appendChild(fila);
}

/** Simulacion de carga de preguntas */

setTimeout(() => {
    document.getElementById("cargando").style.display = "none";
    document.getElementById("questions").style.display = "block";

    printQuestionsSaved(arrQuestion);

}, 3000);

document.getElementById("back").addEventListener('click', () => {
    document.location.href = "../index.html";
});

document.getElementById("save").addEventListener('click', () => {

    let name = document.getElementById("nameQuestion").value;
    let answer = document.getElementById("true").checked;
    let points = document.getElementById("points").value;
    let question;

    if (name == "" && points == "") {
        document.getElementById("warning").style.display = "block";
    } else {

        question = {
            name: name,
            answer: answer,
            points: points,
            status: status
        };

        saveQuestion(bd, codeId, question);
    }
});
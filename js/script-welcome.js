// Recogo el dato enviado por el link que es el correo.
let cadVariables = location.search.substring(1, location.search.length);
let arrVariables = cadVariables.split("&");

for (i = 0; i < arrVariables.length; i++) {
    var arrVariableActual = arrVariables[i].split("=");
}

let emailUser = arrVariableActual[1];

var datenow = new Date();
var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
var date = datenow.getDate() + " / " + meses[datenow.getMonth()] + " / " + datenow.getFullYear();
var hour = datenow.getHours() + ":" + datenow.getMinutes();

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

function setCookie(nombre, valor, caducidad = 30) {
    let fecha = new Date();
    fecha.setTime(fecha.getTime() + caducidad * 60 * 60 * 1000);
    let expiracion = "expires=" + fecha.toUTCString();

    document.cookie = nombre + "=" + valor + ";" + expiracion + ";path=/";
}

let users = JSON.parse(getCookie("datos"));
var codeId;
var dataUser;
var id;

for (const key in users.usuarios) {
    if (users.usuarios[key].correo == emailUser) {
        dataUser = users.usuarios[key];
        codeId = key;
        id = users.usuarios[key].id;
    }
}

/**
 * Funcion que se activa cuando el usuario a sido registrado previamente
 * 
 * @param {Object} bd Base de datos donde se encuentra el usuario 
 * @param {key} codeId Su ID del usuario
 */
function rewriteUser(bd, codeId) {
    bd.usuarios[codeId].date = date;
    bd.usuarios[codeId].hour = hour;

    setCookie("datos", JSON.stringify(bd));
}

// Lo imprimo por pantalla
document.getElementById("user").innerHTML = dataUser.correo;
document.getElementById("lastLoginDate").innerHTML = dataUser.date;
document.getElementById("lastLoginHour").innerHTML = dataUser.hour;
document.getElementById("bttBack").addEventListener('click', () => {
    rewriteUser(users, codeId);
    document.location.href = "../index.html";
}, false);

document.getElementById("bttQuestion").addEventListener('click', () => {
    rewriteUser(users, codeId);
    document.location.href = "./view.questionUser.html?id=" + id;
}, false);
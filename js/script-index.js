import { setCookie, getCookie, deleteCookie } from "./methods-cookie.js";

var node_message = document.getElementById("message");
var node_form_login = document.getElementById("login");
var node_mail = document.getElementById("emailUser");
var cookie;
var object_user;

window.addEventListener('load', () => {
    cookie = getCookie("datos");
    if (cookie) {
        object_user = JSON.parse(cookie);
    } else {
        createBaseWithDataTest();
        cookie = getCookie("datos");
        object_user = JSON.parse(cookie);
    }
});

/**
 * Funcion donde redirijo la pagina si cumple la combinacion de teclas
 * @param {Event} event  Evento añadido en el elemento
 */
async function changeWindows(event) {
    let code = event.keyCode;

    if (event.ctrlKey && code == 121) {
        node_message.style.display = "none";
        node_form_login.style.display = "block";
        node_mail.focus(node_mail.addEventListener('blur', validation, false));
    }
}

// Validacion del correo ingresado

function validation() {

    let email = node_mail.value;
    let expression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (expression.test(email)) {
        checkAndSaveData();
    } else {
        document.getElementById("warning").style.display = 'block';
        node_mail.select();
    }
}

// Recopilacion y guardar de datos insertados

var datenow = new Date();
var date = datenow.getDate() + "/" + datenow.getMonth() + "/" + datenow.getDay();
var hour = datenow.getHours() + ":" + datenow.getMinutes();

function getDataUser() {

    let mail = node_mail.value;
    let id;

    for (let i = 0; i < mail.length; i++) {
        if (mail.charAt(i) == '@') {
            id = mail.substring(0, i);
        }
    }

    let usuario = {
        id: id,
        correo: mail,
        date: date,
        hour: hour,
        questions: [{}]
    }

    return usuario;
}

function createBaseWithDataTest() {

    let datos = {
        usuarios: [{
            id: "correoPrueba",
            correo: "correoPrueba@gmail.com",
            date: "20/12/2020",
            hour: "15:45",
            questions: [{
                name: "uno",
                answer: true,
                points: 8,
                status: "ok"
            }]
        }]
    };
    // Pasa el objeto en un objeto string JSON
    setCookie("datos", JSON.stringify(datos));
}

/**
 * Si los datos no se encuentran registrados se guardara en la cookie
 * 
 * @param {Object} bd Base de datos donde se encuentra el usuario
 */
function saveData(bd) {
    bd.usuarios.push(getDataUser());
    setCookie("datos", JSON.stringify(bd));
}

function checkAndSaveData() {
    // Compruebo si la cookie existe y si no crea una con unos datos prederterminados

    let confirmationRegister;
    let mail = node_mail.value;
    let codeIdUser;

    // Aqui compruebo si los datos ingresados no han sido antes ingresados y guardados
    for (const key in object_user.usuarios) {
        if (object_user.usuarios[key].correo == mail) {
            confirmationRegister = true;
            codeIdUser = key;
            break;
        } else {
            confirmationRegister = false;
        }
    }

    // Dependiendo de la respuesta llama a una funcion
    if (confirmationRegister) {
        document.location.href = './views/view.welcome.html?user=' + mail;
    } else {
        saveData(object_user);
        document.location.href = './views/view.welcome.html?user=' + mail;
    }
}

window.addEventListener("keydown", changeWindows, false);
document.getElementById("enviar").addEventListener('click', () => { validation }, false);

// Temporizador donde redirige la pagina en 5s despues del haberse inicializado la pagina de inicio 
setTimeout(() => {
    node_message.style.display = "none";
    node_form_login.style.display = "block";
    node_mail.focus(node_mail.addEventListener('blur', validation, false));
}, 5000);

clearTimeout();
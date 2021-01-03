/**
 * Envio las nuevas visitas para almacenar
 * 
 * @param {String} nombre Nombre de la cookie
 * @param {Number} valor Valor que tendra el nombre de la cookie
 * @param {Number} caducidad Dias que caducira la cookie
 */
export function setCookie(nombre, valor, caducidad = 30) {
    let fecha = new Date();
    fecha.setTime(fecha.getTime() + caducidad * 60 * 60 * 1000);
    let expiracion = "expires=" + fecha.toUTCString();

    document.cookie = nombre + "=" + valor + ";" + expiracion + ";path=/";
}

/**
 * Obtenemos valor de las cookie indicada
 * @param {string} nombreCookie Nombre de la cookie que deseamos ver
 * @returns {Object} valor de la cookie
 */
export function getCookie(nombreCookie) {
    let arrayCookie = document.cookie.split(";");

    // Array donde coloco el nombre de la cookie como clave con su valor correspondiente
    let arrayValor = new Array();
    for (let dato of arrayCookie) {
        let [nombre, valor] = dato.split("=");
        arrayValor[nombre] = valor;
    }

    return arrayValor[nombreCookie];
}

/**
 * Funcion para borrar la cookie indicada
 * 
 * @param {String} nombre
 */
export function deleteCookie(nombre) {
    setCookie(nombre, "", 0)
}
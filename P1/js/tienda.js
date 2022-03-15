// importamos modulo http
const http = require('http');
// importamos modulo fs
const fs = require('fs');
// escuchamos en puerto 7007
const PUERTO = 7007; 

const server = http.createServer(function(req, res) {

    console.log("\nPetición recibida!");
    let myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("La URL del recurso solicitado es: " + myURL.href)
    let solicitud = "";
    if(myURL.pathname == '/') { 
      solicitud += "/web.html" 
    }else {
      solicitud = myURL.pathname;
    }
    file_extension = solicitud.split(".")[1];
    solicitud = "." + solicitud 
    console.log("Nombre del fichero: " + solicitud);
    console.log("Extension del recurso: " + file_extension);
    const type_mime = {
        "html" : "text/html",
        "css" : "text/css",
        "jpeg" : "image/jpeg",
        "jpg" : "image/jpg",
        "png" : "image/png",
        "gif" : "image/gif",
    }; 
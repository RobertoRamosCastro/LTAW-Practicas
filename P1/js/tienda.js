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
    }else if(myURL.pathname == "/favicon.icon"){
      filename = 'imagenes/ico.ico'
    }else {
      solicitud = myURL.pathname;
    }
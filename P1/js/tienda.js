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
        "ico" : "image/ico",
    }; 
    let mime = type_mime[file_extension];
    console.log("El tipo mime asociado: " + mime);
    fs.readFile(solicitud, function(err,data) {
        if(err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        console.log("404 Not Found");
        solicitud = "html/error.html";
        data = fs.readFileSync(solicitud);
        }else {
        res.writeHead(200, {'Content-Type': mime});
        console.log("200 OK")
        }
        res.write(data);
        res.end();
    });
});
server.listen(PUERTO);
console.log("Server activo!. Escuchando en puerto: " + PUERTO);
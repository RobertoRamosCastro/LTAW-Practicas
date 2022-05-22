const http = require('http');
const fs = require('fs');
const url = require('url');
var rute = "";
var user = "";
var registered = false;
//-- Variable para guardar el usuario
let user_activo;
let item_list;
//-- Definir el puerto a utilizar
const PUERTO = 9000;

//-- Imprimir informacion sobre el mensaje de solicitud
function print_info_req(req) {
  console.log("");
  console.log("Mensaje de solicitud");
  console.log("====================");
  console.log("Método: " + req.method);
  console.log("Recurso: " + req.url);
  console.log("Version: " + req.httpVersion)
}

// Función para obtener tipo de archivo
function getExtension(filename) {
  return filename.split('.').pop();
}
const FICHERO_RESP = 'html/form_resp.html';
const FICHERO_CESTA = 'html/cesta.html';
const PRODUCTOS_JSON = fs.readFileSync('json/productos.json');
const ROOT_FILE = 'html/root.html';

const ROOT = fs.readFileSync(ROOT_FILE, 'utf-8');

//-- Obtener el array de productos
let productos = JSON.parse(PRODUCTOS_JSON);

const FICHERO_PEDIDO = 'html/pedido.html'

//-- HTML de la página de respuesta
const RESPUESTA = fs.readFileSync(FICHERO_RESP, 'utf-8');
const CESTA = fs.readFileSync(FICHERO_CESTA, 'utf-8');

//-- HTML página de error
const ERROR = fs.readFileSync('html/error.html', 'utf-8');

//-- HTML principal
const MAIN = fs.readFileSync('index.html', 'utf-8');

//-- Respuesta root
const FICHERO_ROOT = "html/root_form.html"

//-- Leo base de datos
const FICHERO_JSON = "json/tienda.json"
const tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Creo la estructura
const tienda = JSON.parse(tienda_json);

function get_user(req)  

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);
console.log("Server listo!. Escuchando en puerto: " + PUERTO);
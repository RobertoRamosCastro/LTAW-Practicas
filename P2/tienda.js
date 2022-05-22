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

function get_user(req) {

  //-- Leer la Cookie recibida
  const cookie = req.headers.cookie;

  //-- Hay cookie
  if (cookie) {
    
    //-- Obtener un array con todos los pares nombre-valor
    let pares = cookie.split(";");

    //-- Recorrer todos los pares nombre-valor
    pares.forEach((element, index) => {

      //-- Obtener los nombres y valores por separado
      let [nombre, valor] = element.split('=');

      //-- Leer el usuario
      //-- Solo si el nombre es 'user'
      if (nombre.trim() === 'user') {
        user_activo = valor;
      }
    });

    //-- Si la variable user no está asignada
    //-- se devuelve null
    return user_activo || null;
  } else {
      user_activo = null;
  }
}

function get_items(req) {

  //-- Leer la Cookie recibida
  const cookie = req.headers.cookie;

  //-- Hay cookie
  if (cookie) {
    //-- Obtener un array con todos los pares nombre-valor
    let pares = cookie.split(";");

    //-- Recorrer todos los pares nombre-valor
    pares.forEach((element, index) => {

      //-- Obtener los nombres y valores por separado
      let [nombre, valor] = element.split('=');

      //-- Leer el usuario
      //-- Solo si el nombre es 'user'
      if (nombre.trim() === 'carrito') {
        console.log("Hay objetos")
        item_list = valor;
      }
    });

    //-- Si la variable user no está asignada
    //-- se devuelve null
    return item_list || null;
  } else {
      item_list = null;
  }

}

//-- Crear el servidor
const server = http.createServer((req, res) => {
  // Obtengo URL
  let dir = url.parse(req.url);

  //-- Indicamos que se ha recibido una petición
  console.log("Petición recibida!");

  // Obtengo tipo de archivo
  rute = getExtension(req.url);
  print_info_req(req);
  console.log(rute);

  function dir_document() {
    // Dirección para cargar
    if (dir.pathname == "/") {
      file = "index.html";
    } else {
      var direccion = dir.pathname;
      var len = direccion.length;
      var r_slice = direccion.slice(1,len);
      file = r_slice;
    }
  }

  dir_document();

  // Compruebo si existe la dirección si es una página
  if (rute == 'html') {
    if(fs.existsSync(dir.pathname)){
      // Si existe se manda a esa dirección
      dir_document(); 
   } 
  }


  //-- Construir el objeto url con la url de la solicitud
  const myURL = new URL(req.url, 'http://' + req.headers['host']);      

  if (myURL.pathname == '/procesar') {
    c_type = "text/html";
    file = FICHERO_RESP;
  }

  if (myURL.pathname == '/pedido') {
    c_type = "text/html"
    file = FICHERO_PEDIDO;
    
  }

  if (myURL.pathname == '/objeto') {
    c_type = "text/html"
    file = FICHERO_ROOT;    
  }

  if (myURL.pathname == '/productos') {
    c_type = "application/json";
    const DIR_PRODUCTOS = 'json/productos.json';
    var json_productos = tienda["productos"]
    let json_salida = JSON.stringify(json_productos);
    fs.writeFileSync(DIR_PRODUCTOS,json_salida);
    file = DIR_PRODUCTOS;
  }

    //-- Obtener le usuario que ha accedido
    //-- null si no se ha reconocido
    let user = get_user(req);
    let items = get_items(req);
    console.log("User: " + user);
    console.log("Objetos: " + items);

  //-- Si hay datos en el cuerpo, se imprimen
  req.on('data', (cuerpo) => {

    //-- Los datos del cuerpo son caracteres
    req.setEncoding('utf8');
    console.log(`Cuerpo (${cuerpo.length} bytes)`)
    console.log(` ${cuerpo}`);

    const myURL = new URL('http://' + req.headers['host'] + '?' + cuerpo);
    //-- Leer los parámetros

    // Inicio de sesión
    let nombre = myURL.searchParams.get('usuario');
    let passw = myURL.searchParams.get('password');
    console.log("Nombre: " + nombre);
    console.log("Nombre: " + passw);

    for (i=0; i<tienda["usuarios"].length; i++){
      console.log("Tienda JSON: " + tienda["usuarios"][i]["nombre"]);
      var json_user = tienda["usuarios"][i]["nombre"];
      var json_pass = tienda["usuarios"][i]["password"];

      if (json_user == nombre && json_pass == passw ) {
        console.log("usuario existe");
        user = nombre;
        registered = true;
        break;
      } 
    }

    let direccion = myURL.searchParams.get('direccion');
    let tarjeta = myURL.searchParams.get('tarjeta');
    if (direccion) {
      console.log("Es un pedido: " + tarjeta)
        
      var n_pedido = {
         "username": user_activo,
         "direccion": direccion,
         "tarjeta": tarjeta,
         "lista": item_list.split(":") 
      }

      // lo añado al array de pedidos
      tienda["pedidos"].push(n_pedido)

      let json_salida = JSON.stringify(tienda);
      fs.writeFileSync(FICHERO_JSON,json_salida);
    }

    // Añadiendo objetos desde root
    let new_obj = myURL.searchParams.get('new_obj');
    let new_des = myURL.searchParams.get('new_des');
    let stock = myURL.searchParams.get('stock');
    let section = myURL.searchParams.get('seccion')
    console.log('SECCION --> ' + section)
    var new_url = "";

    switch (section) {
      case 'basket':
        new_url = "html/basket.html";
        break;
    
      case 'f11':
        new_url = "html/f11.html"
        break;

      case 'Escudos':
        new_url = "html/fs.html"
        break;
    }
    if (new_obj) {
      var add_obj = {
        "url": new_url,
        "nombre": new_obj,
        "descripción": new_des,
        "stock": parseInt(stock) 
     }

     // lo añado al array de pedidos
     tienda["productos"].push(add_obj)

     let json_salida = JSON.stringify(tienda);
     fs.writeFileSync(FICHERO_JSON,json_salida);
      
    }

  });

});

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);
console.log("Server listo!. Escuchando en puerto: " + PUERTO);
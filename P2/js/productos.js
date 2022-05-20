const canvas = document.getElementById('canvas');
let imgs =  document.getElementsByClassName('images');
const ctx = canvas.getContext('2d');
const description = document.getElementById('descriptor');
const art_name = document.getElementById('name')
var img = [];
let items = [];

function send_cookie(){
  console.log('Añadiendo item al carrito!')
  items.push(art_name.innerText);
  // Paso el array a string
  var final_cookie = items.join(':')
  document.cookie = "carrito=" + final_cookie + "; path=/ ; Secure";
  console.log(items);
}

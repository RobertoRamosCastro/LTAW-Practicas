//-- Elementos del interfaz
const display = document.getElementById("display");
const display_user = document.getElementById("display_user");
const msg_entry = document.getElementById("msg_entry");
const login_msg = document.getElementById("user");
const login_backgr = document.getElementsByClassName("chat");
var elmnt = document.getElementById("msg_recibidos");
var typing_msg = document.getElementsByClassName("typing");
var user = "";
var typing = false;
var nickname = false;
const sound_msg = new Audio("new_msg.oga");


function play_sound(sound){
  sound.currentTime = 0;
  sound.play();
}

function main() {
  // Cada 100ms se actualiza el scroll para estar actualizado
  setInterval(function(){  
    elmnt.scrollTop = elmnt.scrollHeight;
  }, 100);

    document.onkeydown = function(ev) {
      if (nickname && ev.key != 'Enter') {
        onKeyDown();
      }
    }
  
    document.onkeyup = function(ev) {
      setTimeout(typingstopped, 1000);
    }    
  
}

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();




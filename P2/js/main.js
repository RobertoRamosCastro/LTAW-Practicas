function main() {

    // Obtenemos los audios
    var audiosable = document.getElementById("audiosable");
    var audioblaster = document.getElementById("audioblaster");
    var audioxiwing = document.getElementById("audioXWing");

    // Obtenemos los productos
    var sable = document.getElementById("sable");
    var blaster = document.getElementById("blaster");
    var xwing = document.getElementById("XWing");

    // Obtengo el banner
    var banner = document.getElementById("img");
    var section_banner = document.getElementById("banner");

    //Obtengo la caja de búsqueda y el display
    var caja = document.getElementById("caja_busqueda");
    var display = document.getElementById("display");

    // Activamos la reproducción de los audios al pasar el mouse por encima
    sable.onmouseover = () => {
        audiosable.play();
    }

    blaster.onmouseover = () => {
        audioblaster.play();
    }

    xwing.onmouseover = () => {
        audioxiwing.play();
    }
}
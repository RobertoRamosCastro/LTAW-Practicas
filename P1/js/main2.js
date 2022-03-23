function main() {

    // Obtenemos los productos
    var xwing = document.getElementById("X-Wing");
    var sable = document.getElementById("sable");
    var carrito = document.getElementById("carrito");
    var compra = document.getElementById("compraya")

    xwing.onmouseover = () => {
        audioxwing.play();
    }

    sable.onmouseover = () => {
        audiosable.play();
    }

    // Activamos el audio al hacer click
    carrito.onclick = () => {
        audiocarrito.play();
    }

    compra.onclick = () => {
        audiocompra.play();
    }
}
function main() {

    // Obtenemos los productos
    var sable = document.getElementById("sable");
    var blaster = document.getElementById("blaster");
    var xwing = document.getElementById("XWing");
    var carrito =document.getElementById("carrito");

    // Obtengo el banner
    var banner = document.getElementById("img");
    var section_banner = document.getElementById("banner");

    // Activamos temporizador para que cada 10 segundos cambie la imagen del banner
    setTimeout( () =>{
        banner.src = "./Imagenes/Banner.png";
        section_banner.style.backgroundColor = "#1f1f1f";
        let imagen1 = setInterval( () => {
            banner.src = "./Imagenes/Banner.png";
            section_banner.style.backgroundColor = "#1f1f1f";
        }, 20000);
    }, 10000);

    let imagen2 = setInterval( () => {
        banner.src = "./Imagenes/banner2.jpg";
        section_banner.style.backgroundColor = "black";
    }, 20000);

}
 # Práctica 1

## Descripción:
    Son páginas con HTML, las páginas correspondientes a los productos contienen además javascript 
    para mostrar mejor los artículos disponibles, estos comparten la hoja de estilos (articulos.css), 
    la página principal (index.html) tiene su hoja de estilos en el exterior (stylesheet.css).

## Estructura: 
    La página constra de 3 secciones deportivas y cada una de ellas contiene 4 productos con sus respectivas descripciones.

## Funcionamiento:
- Ejecutar en el terminal, en la carpeta de la práctica, el comando: node tienda.js.
- Abrir una pestaña en el navegador con la url: "127.0.0.1:PUERTO", donde PUERTO=9004.

## Servidor:
    El servidor es un programa, escrito en node.js, se encarga de recibir las peticiones de los clientes
    y procesarlas detectándo qué es lo que se pide, accede al sistema de ficheros local, localiza el recurso
    y lo devuelve. En caso de que el recurso no exista, devuelve la página de error: "error.html".

 

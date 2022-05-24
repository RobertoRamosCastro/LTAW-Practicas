 # Práctica 2
 
## Descripción:
    Tienda con node.js que además implementa cookies para recordar datos de usuario. 
    En esta tienda se puede utilizar el buscador y además iniciar sesión.

## Estructura: 
    La página constra de 3 secciones deportivas y cada una de ellas contiene 4 productos con sus respectivas descripciones.

## Funcionamiento:
- Ejecutar en el terminal, en la carpeta de la práctica, el comando: node tienda.js.
- Abrir una pestaña en el navegador con la url: "127.0.0.1:PUERTO", donde PUERTO=9000.

## AJAX:
    La búsqueda de productos funciona con peticiones AJAX que se van generando cada vez que 
    se introduce un nuevo caracter, de forma que busca en la base de datos los artículos que
    comiencen con los carácteres introducidos, en el caso de que existan, se abrirá un apartado
    en el que se puede seleccionar y se redirigirá a la página de la sección de ese producto.

## ERROR:
    No funciona la cesta de la compra, incapacidad para añadir los productos al JSON y que este los guarde en la cesta.


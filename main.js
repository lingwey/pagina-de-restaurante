//var cargarMasBtn = document.getElementById("cargar-mas");
let currentItem = 4;
$("#mostrarMas").click( () => {
    let cajas = [...document.querySelectorAll('.caja-container .caja')];
    console.log(cajas.length)
    for (let i = currentItem; i< currentItem + 4; i++){
        cajas[i].style.display ='inline-block';
    }
    currentItem += 4;
    if(currentItem >= cajas.length){
        //cargarMasBtn.style.display='none';
        $("#mostrarMas").hide();
        $("#mostrarMenos").show();
    }
})

$("#mostrarMenos").click(() => {
   ocultarCajas()
})

function ocultarCajas() {
    let cajas = [...document.querySelectorAll('.caja-container .caja')];
    for (let i = 0; i < cajas.length; i++) {
        if (i < currentItem) {
            cajas[i].style.display = 'none';
        }
        if (i == 4){
            currentItem = 4;
            $("#mostrarMenos").hide();
            $("#mostrarMas").show();
            return
        }
    }
    
   
}


//carrito

var carrito = document.getElementById('carrito');
const elementos = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventos ();

function cargarEventos (){
    elementos.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento (e){
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento ={
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute("data-id")
    }
    subirCarrito(infoElemento);
}

function subirCarrito(elemento){
    const filaCarrito = document.createElement('tr');
    filaCarrito.innerHTML = `
        <td>
            <img src = "${elemento.imagen}" width = 100 />
        </td>

        <td>
            ${elemento.titulo}
        </td>

        <td>
            ${elemento.precio}
        </td>

        <td>
            <a herf = "#" class = "borrar" data-id ="${elemento.id}">
                X
            </a>
        </td>
    `;

    lista.appendChild(filaCarrito);

}

function eliminarElemento(e){
    e.preventDefault();
    let elemento;
    let elementoID;

    if(e.target.classList.contains("borrar")){
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoID = elemento.querySelector("a").getAttribute("data-id");

    }
}

function vaciarCarrito (){
    while (lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    return false
}


//manejo de carrusel de imagenes
var imgCarruselResto = ["muestraDePlatillos", "servicio", "cocina", "restoPorDentro", "restoPorFuera"];
var imagen = -1;
var tempo;
window.addEventListener('load', carrusel)
function carrusel(){
    for (let i = 0; i < imgCarruselResto.length; i++){
        document.querySelector("#bolitas").insertAdjacentHTML('beforeend', `<div class = "bolitas" seudo = "${i}"></div>`)
        document.querySelectorAll(".bolitas")[i].onclick = imagenSeleccion;
        
    }
    cambiarImagCarrusel()
    tempo = setInterval(cambiarImagCarrusel,2500);

    
}

function cambiarImagCarrusel (){
    imagen++
    if (imagen >= imgCarruselResto.length){
        imagen = 0;
    }
   actualizarImagen();
    pintar();
}

function actualizarImagen (){
    document.querySelector("#carrusel").innerHTML = `<img src = "imgRestaurantes/${imgCarruselResto[imagen]}.jpg">`;
}

function pintar(){
    for (let i = 0; i < imgCarruselResto.length; i++){
        document.querySelectorAll(".bolitas")[i].style.backgroundColor = null;
    }

    document.querySelectorAll(".bolitas")[imagen].style.backgroundColor = "#007aff";
}

function imagenSeleccion (){
    clearInterval(tempo);
    imagen = this.getAttribute("seudo");
    pintar();
    actualizarImagen();
    tempo = setInterval(cambiarImagCarrusel,2500);
}




//carrito

var carrito = document.getElementById('carrito');
var elementos1 = document.getElementById('lista-1');
var elementos2 = document.getElementById('lista-2');
var elementos3 = document.getElementById('lista-3');
var lista = document.querySelector('#lista-carrito tbody');
var vaciarCarritoBtn = document.getElementById('vaciar-carrito');
var carritoCostoTotal = $('#total');
carritoCostoTotal.text("$0.00")

cargarEventos ();

function cargarEventos (){
    elementos1.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);
    elementos3.addEventListener('click', comprarElemento);
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

        <td class = "precio">
            ${elemento.precio}
        </td>

        <td>
            <a herf = "#" class = "borrar" data-id ="${elemento.id}">
                X
            </a>
        </td>
    `;
   
    
    lista.appendChild(filaCarrito);
    actulizarCostoTotal();
}

function actulizarCostoTotal(){
    let costoTotalActual = 0;
    const elementosCarrito = document.querySelectorAll("#lista-carrito tbody tr");
    elementosCarrito.forEach(function(elementoCarrito){
        const precio = parseFloat(elementoCarrito.querySelector(".precio").textContent.replace("$", ""));
        costoTotalActual += precio;
    });
    carritoCostoTotal.text ("$" + costoTotalActual.toFixed(2));
    console.log(costoTotalActual)
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
    actulizarCostoTotal();
}

function vaciarCarrito (){
    while (lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    carritoCostoTotal.text("$0.00")
    return false
}

//control del swiper
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination : {
        el:".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0:{
            slidesPerView: 1,
        },
        520:{
            slidesPerView: 1,
        },
        950:{
            slidesPerView: 2,
        },
    } 
});

//formulario
window.addEventListener('load', esconderFormulario)
function esconderFormulario (){
    $("#formulario").hide();
    $("#pedidoListo").hide();
}

$("#pagar").click(function (){
    if (lista.children.length >= 1){
        $(".esconder").hide();
        $("#formulario").show();
        $('html, body').animate({
            scrollTop: $("#formulario").offset().top
        }, 500);
    }
})

$("#finalizarPedido").click(function () {
    $("#formulario").hide();
    $("#pedidoListo").show();
    setTimeout(function(){
     $("#pedidoListo").hide();
    }, 5000);
    setTimeout(function(){
        $(".esconder").show();
    },5000);
    
    vaciarCarrito();
})

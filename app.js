document.addEventListener("DOMContentLoaded", function() {
    const agregarBotones = document.querySelectorAll(".agregar");
    const listaCarrito = document.querySelector(".lista-carrito");
    const total = document.querySelector(".total p");
    let totalCompra = 0;

    agregarBotones.forEach(boton => {
        boton.addEventListener("click", agregarProducto);
    });

    function agregarProducto(evento) {
        const boton = evento.target;
        const producto = boton.parentElement;
        const nombre = producto.querySelector("h2").textContent;
        const precio = parseFloat(producto.querySelector("p").textContent.replace("$", ""));
        
        const nuevoProducto = document.createElement("li");
        nuevoProducto.innerHTML = `${nombre} - $${precio.toFixed(2)} <button class="eliminar">Eliminar</button>`;
        listaCarrito.appendChild(nuevoProducto);

        totalCompra += precio;
        total.textContent = `$${totalCompra.toFixed(2)}`;

        const botonesEliminar = document.querySelectorAll(".eliminar");
        botonesEliminar.forEach(botonEliminar => {
            botonEliminar.addEventListener("click", eliminarProducto);
        });
    }

    function eliminarProducto(evento) {
        const botonEliminar = evento.target;
        const producto = botonEliminar.parentElement;
        const precio = parseFloat(producto.textContent.match(/\d+\.\d+/)[0]);
        
        listaCarrito.removeChild(producto);

        totalCompra -= precio;
        total.textContent = `$${totalCompra.toFixed(2)}`;
    }
});


var enlace = document.querySelectorAll(' .agregar');

  // Agregar un event listener para el evento 'click'
  enlace.addEventListener('click', function(event) {
    // Prevenir el comportamiento por defecto del enlace
    event.preventDefault();
    
    // Realizar cualquier otra acción deseada aquí
    
    // Por ejemplo, podrías agregar tu propia lógica JavaScript aquí
    
    console.log('Has hecho clic en el enlace pero el comportamiento nativo se ha evitado.');
  });



  function changeImage(imageSrc) {
    document.getElementById('product-img').src = imageSrc;
}

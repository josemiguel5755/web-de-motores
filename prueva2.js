document.addEventListener('DOMContentLoaded', function() {
    const carritoProductos = document.querySelector('.carrito-productos');
    const totalSpan = document.getElementById('total');
    let totalAPagar = 0;

    // Función para agregar un producto al carrito o actualizar la cantidad si ya está en el carrito
    function agregarAlCarrito(nombre, precio) {
        const productosEnCarrito = carritoProductos.querySelectorAll('.carrito-producto');
        let productoExistente = null;

        productosEnCarrito.forEach(function(producto) {
            if (producto.dataset.nombre === nombre) {
                productoExistente = producto;
                alert("se agrego");
            }
        });

        if (productoExistente) {
            const cantidadSpan = productoExistente.querySelector('.cantidad-numero');
            let cantidad = parseInt(cantidadSpan.textContent);
            cantidad++;
            cantidadSpan.textContent = cantidad;
        } else {
            totalAPagar += precio;
            totalSpan.textContent = totalAPagar.toFixed(2);

            const nuevoProducto = document.createElement('div');
            nuevoProducto.classList.add('carrito-producto');
            nuevoProducto.dataset.nombre = nombre;
            nuevoProducto.innerHTML = `
                <span class="nombre">${nombre}</span>
                <span class="precio">$${precio.toFixed(2)}</span>
                <div class="cantidad">
                    <button class="disminuir">-</button>
                    <span class="cantidad-numero">1</span>
                    <button class="aumentar">+</button>
                    <button class="eliminar">Eliminar</button>
                </div>
            `;

            carritoProductos.appendChild(nuevoProducto);

            actualizarEventosEliminar();
            actualizarEventosCantidad();
        }

        actualizarTotal();
    }

    // Actualiza los eventos de eliminación de productos
    function actualizarEventosEliminar() {
        const botonesEliminar = document.querySelectorAll('.eliminar');
        botonesEliminar.forEach(function(boton) {
            boton.addEventListener('click', function() {
                const producto = boton.parentElement.parentElement;
                const precio = parseFloat(producto.querySelector('.precio').textContent.slice(1)); // Quita el signo $
                const cantidad = parseInt(producto.querySelector('.cantidad-numero').textContent);
                totalAPagar -= precio * cantidad;
                totalSpan.textContent = totalAPagar.toFixed(2);
                producto.remove();
            });
        });
    }

    // Actualiza los eventos de cantidad de productos
    function actualizarEventosCantidad() {
        const botonesAumentar = document.querySelectorAll('.aumentar');
        botonesAumentar.forEach(function(boton) {
            boton.addEventListener('click', function() {
                const cantidadSpan = boton.parentElement.querySelector('.cantidad-numero');
                let cantidad = parseInt(cantidadSpan.textContent);
                cantidad++;
                cantidadSpan.textContent = cantidad;
                actualizarTotal();
            });
        });

        const botonesDisminuir = document.querySelectorAll('.disminuir');
        botonesDisminuir.forEach(function(boton) {
            boton.addEventListener('click', function() {
                const cantidadSpan = boton.parentElement.querySelector('.cantidad-numero');
                let cantidad = parseInt(cantidadSpan.textContent);
                if (cantidad > 1) {
                    cantidad--;
                    cantidadSpan.textContent = cantidad;
                    actualizarTotal();
                }
            });
        });
    }

    // Evento para agregar producto al carrito
    const agregarBotones = document.querySelectorAll('.agregar');
    agregarBotones.forEach(function(boton) {
        boton.addEventListener('click', function() {
            const nombre = boton.getAttribute('data-nombre');
            const precio = parseFloat(boton.getAttribute('data-precio'));
            agregarAlCarrito(nombre, precio);
        });
    });

    // Función para actualizar el total del carrito
    function actualizarTotal() {
        totalAPagar = 0;
        const productos = carritoProductos.querySelectorAll('.carrito-producto');
        productos.forEach(function(producto) {
            const precio = parseFloat(producto.querySelector('.precio').textContent.slice(1)); // Quita el signo $
            const cantidad = parseInt(producto.querySelector('.cantidad-numero').textContent);
            totalAPagar += precio * cantidad;
        });
        totalSpan.textContent = totalAPagar.toFixed(2);
    }
});





document.addEventListener('DOMContentLoaded', (event) => {
    let favoriteItems = new Set();

    function toggleFavorite(element) {
        let productElement = element.closest('.producto');
        let productName = productElement.getAttribute('data-name');
        
        if (favoriteItems.has(productName)) {
            favoriteItems.delete(productName);
            element.innerHTML = '&#9825;'; // Corazón sin rellenar
            element.classList.remove('favorited');
            alert("se elimino de favorito")
        } else {
            favoriteItems.add(productName);
            element.innerHTML = '&#9829;'; // Corazón relleno
            element.classList.add('favorited');
            alert("se añadio a favorito")
        }
       
        updateFavoritesList();
    }
   
    function updateFavoritesList() {
        let favoritesList = document.getElementById('favorites-list');
        favoritesList.innerHTML = ''; // Limpiar la lista de favoritos
       
        
        favoriteItems.forEach(function(productName) {
            let productElement = document.querySelector(`.producto[data-name="${productName}"]`);
            if (productElement) {
                let name = productElement.getAttribute('data-name');
                let description = productElement.getAttribute('data-description');
                let price = productElement.getAttribute('data-price');
                let image = productElement.getAttribute('data-image');
                let link = productElement.getAttribute('data-link');
                
                let favoriteItem = document.createElement('div');
                favoriteItem.classList.add('favorite-item');
                favoriteItem.innerHTML = `
                    <img src="${image}" alt="${name}">
                    <div class="info">
                        <h3>${name}</h3>
                        <p>${description}</p>
                        <span class="price">${price}</span>
                        <a href="${link}" target="_blank">Ver producto</a>
                    </div>
                    <button class="remove-btn" onclick="removeFavorite('${productName}')">Eliminar</button>
                `;
                
                favoritesList.appendChild(favoriteItem);
            }
        });
    }

    function removeFavorite(productName) {
        favoriteItems.delete(productName);
        let productElement = document.querySelector(`.producto[data-name="${productName}"] .favorite`);
        if (productElement) {
            productElement.innerHTML = '&#9825;'; // Corazón sin rellenar
            productElement.classList.remove('favorited');
        }
        updateFavoritesList();
    }

    window.toggleFavorite = toggleFavorite;
    window.removeFavorite = removeFavorite;
});




//perfil
// document.getElementById('cargarfoto').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             document.getElementById('profileImage').src = e.target.result;
//         };
//         reader.readAsDataURL(file);
//     }
// });

// document.getElementById('uploadForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     alert('Imagen subida con éxito (solo en el navegador)');
// });


document.addEventListener('DOMContentLoaded', () => {
    // Cargar imagen desde localStorage al cargar la página
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        document.getElementById('profileImage').src = savedImage;
    }
});

// Manejar la selección de imagen para vista previa
document.getElementById('cargarfoto').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Manejar la subida de imagen
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('cargarfoto');
    const file = fileInput.files[0];

    if (!file) {
        alert('No se seleccionó ninguna imagen');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const result = e.target.result;
        localStorage.setItem('profileImage', result);
        alert('Imagen subida con éxito');
    };

    reader.readAsDataURL(file);
});

// Manejar la eliminación de imagen
document.getElementById('deleteButton').addEventListener('click', function() {
    localStorage.removeItem('profileImage');
    document.getElementById('profileImage').src = 'imagenes/usuario-especialista.png';
    alert('Imagen eliminada con éxito');
});




//inicio de sesion

document.getElementById("inicio").addEventListener("submit", function(event) {
    event.preventDefault();

    var gmail = document.getElementById("gmail").value;
    var password = document.getElementById("password").value;

    if (gmail === "admin@1" && password === "123") {
        window.location.href = "nosotros.html";
    } else {
        alert("La contraseña o el usuario es incorrecto");
    }
});

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
                alert("se agrego")
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



// slider de foto


const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section");


btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRight())

setInterval(() => {
    moveToRight()
}, 3000);


let operacion = 0,
    counter = 0,
    widthImg = 100 / sliderSection.length;

function moveToRight() {
    if (counter >= sliderSection.length-1) {
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    counter++;
    operacion = operacion + widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
    
}  

function moveToLeft() {
    counter--;
    if (counter < 0 ) {
        counter = sliderSection.length-1;
        operacion = widthImg * (sliderSection.length-1)
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    operacion = operacion - widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
    
    
}   



// calificaion del producto

document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const percentage = document.getElementById('percentage');
    const feedback = document.getElementById('feedback');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-value');
            const percent = (rating / 5) * 100;

            // Actualizar la visualización de las estrellas
            stars.forEach(s => {
                s.classList.remove('active');
                if (s.getAttribute('data-value') <= rating) {
                    s.classList.add('active');
                }
            });

            // Actualizar el porcentaje y el feedback
            percentage.textContent = `${percent}%`;
            if (percent <= 40) {
                feedback.textContent = 'Valoración mala';
                feedback.style.color = 'red';
            } else if (percent <= 60) {
                feedback.textContent = 'Valoración regular';
                feedback.style.color = 'orange';
            } else {
                feedback.textContent = 'Valoración buena';
                feedback.style.color = 'green';
            }
        });
    });
});





//lista de comentarios
document.getElementById('submit-comment').addEventListener('click', function() {
    // Obtén los valores del formulario
    const title = document.getElementById('comment-title').value;
    const text = document.getElementById('comment-text').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
  
    // Valida los datos (esto es un ejemplo simple)
    if (!title || !text || !rating) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    // Crear un nuevo comentario (esto debería enviarse al servidor y luego actualizar la interfaz)
    const commentSection = document.createElement('div');
    commentSection.className = 'comment';
    commentSection.innerHTML = `
      <div class="comment-header">
        <h3 class="comment-title">${title}</h3>
        <div class="comment-rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
        <span class="comment-date">${new Date().toLocaleDateString()}</span>
      </div>
      <div class="comment-body">
        <p class="comment-text">${text}</p>
      </div>
      <div class="comment-footer">
        <button class="like-button">👍 Me gusta</button>
        <button class="dislike-button">👎 No me gusta</button>
      </div>
    `;
  
    // Añadir el nuevo comentario a la lista de comentarios
    document.querySelector('.comment-list').appendChild(commentSection);
  
    // Limpiar el formulario
    document.getElementById('comment-title').value = '';
    document.getElementById('comment-text').value = '';
    document.querySelector('input[name="rating"]:checked').checked = false;
  });
  
  const comments = [
    { title: 'Comentario 1', text: 'Texto del comentario 1', rating: 5, date: '2024-05-01' },
    { title: 'Comentario 2', text: 'Texto del comentario 2', rating: 4, date: '2024-05-02' },
    { title: 'Comentario 3', text: 'Texto del comentario 3', rating: 3, date: '2024-05-03' },
    { title: 'Comentario 4', text: 'Texto del comentario 4', rating: 2, date: '2024-05-04' },
    { title: 'Comentario 5', text: 'Texto del comentario 5', rating: 1, date: '2024-05-05' },
    { title: 'Comentario 6', text: 'Texto del comentario 6', rating: 5, date: '2024-05-06' },
    // Añade más comentarios aquí
  ];
  
  let currentCommentIndex = 0;
  const commentsPerPage = 3;
  
  function loadComments() {
    const commentList = document.querySelector('.comment-list');
    for (let i = currentCommentIndex; i < currentCommentIndex + commentsPerPage && i < comments.length; i++) {
      const comment = comments[i];
      const commentSection = document.createElement('div');
      commentSection.className = 'comment';
      commentSection.innerHTML = `
        <div class="comment-header">
          <h3 class="comment-title">${comment.title}</h3>
          <div class="comment-rating">${'★'.repeat(comment.rating)}${'☆'.repeat(5 - comment.rating)}</div>
          <span class="comment-date">${new Date(comment.date).toLocaleDateString()}</span>
        </div>
        <div class="comment-body">
          <p class="comment-text">${comment.text}</p>
        </div>
         <div class="comment-footer">
          <button class="like-button">👍 Me gusta</button>
          <button class="dislike-button">👎 No me gusta</button>
        </div>
      `;
      commentList.appendChild(commentSection);
    }
    currentCommentIndex += commentsPerPage;
  
    if (currentCommentIndex >= comments.length) {
      document.getElementById('load-more-comments').style.display = 'none';
    }
    document.getElementById('show-less-comments').style.display = 'block';
  }
  
  document.getElementById('load-more-comments').addEventListener('click', loadComments);
  
  document.getElementById('show-less-comments').addEventListener('click', function() {
    const commentList = document.querySelector('.comment-list');
    while (commentList.firstChild) {
      commentList.removeChild(commentList.firstChild);
    }
    currentCommentIndex = 0;
    loadComments();
  
    document.getElementById('load-more-comments').style.display = 'block';
    document.getElementById('show-less-comments').style.display = 'none';
  });
  
  // Cargar los primeros comentarios al iniciar la página
  loadComments();
  












  //favorito

// function toggleFavorite(element) {
//     // Encuentra el elemento de producto padre
//     var productElement = element.closest('.producto');
    
//     // Añadir o quitar la clase 'favorito'
//     productElement.classList.toggle('favorito');
   
    
//     // Cambiar el color del corazón
//     var favoriteIcon = productElement.querySelector('.favorite');
//     if (productElement.classList.contains('favorito')) {
//         favoriteIcon.style.color = 'red'; // Cambiar a rojo cuando es favorito
//     } else {
//         favoriteIcon.style.color = ''; // Volver al color original cuando no es favorito
//         alert("se eleimino de favorito")
//     }
    
//     // Lógica para añadir o quitar de la lista de favoritos (no se incluye en este ejemplo)
//     // Puedes usar localStorage o algún otro método para guardar los favoritos
    
//     updateFavoritesList(); // Actualizar la lista de favoritos visualmente
// }

// function updateFavoritesList() {
//     var favoritesList = document.getElementById('favorites-list');
//     favoritesList.innerHTML = ''; // Limpiar la lista de favoritos
    
//     // Obtener todos los elementos de producto con la clase 'favorito'
//     var favoriteProducts = document.querySelectorAll('.producto.favorito');
    
//     favoriteProducts.forEach(function(product) {
//         // Obtener datos del producto
//         var name = product.getAttribute('data-name');
//         var description = product.getAttribute('data-description');
//         var price = product.getAttribute('data-price');
//         var image = product.getAttribute('data-image');
//         var link = product.getAttribute('data-link');
        
//         // Crear elementos para mostrar en la lista de favoritos
//         var favoriteItem = document.createElement('div');
//         favoriteItem.classList.add('favorito-item');
//         favoriteItem.innerHTML = `
//             <a href="${link}" >
//                 <img src="${image}" alt="${name}">
//                 <div>
//                     <h3>${name}</h3>
//                     <p>${description}</p>
//                     <span class="price">${price}</span>
//                 </div>
//             </a>
        
//         `;
        
//         favoritesList.appendChild(favoriteItem); // Añadir el elemento a la lista de favoritos
//         alert("se añadio al carrito")
//     });
// }




// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    let favoriteItems = new Set();

    function toggleFavorite(element) {
        let productElement = element.closest('.producto');
        let productName = productElement.getAttribute('data-name');
        
        if (favoriteItems.has(productName)) {
            favoriteItems.delete(productName);
            element.innerHTML = '&#9825;'; // Corazón sin rellenar
            element.classList.remove('favorited');
        } else {
            favoriteItems.add(productName);
            element.innerHTML = '&#9829;'; // Corazón relleno
            element.classList.add('favorited');
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

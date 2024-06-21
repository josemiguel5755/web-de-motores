


// script.js
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

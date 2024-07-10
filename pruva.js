
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




document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', filterProducts);
  });

  function filterProducts() {
    const filter = document.getElementById('searchBar').value.toLowerCase();
    const products = document.getElementsByClassName('producto');

    Array.from(products).forEach(product => {
      const productName = product.querySelector('h2').innerText.toLowerCase();
      if (productName.includes(filter)) {
        product.style.display = '';
      } else {
        product.style.display = 'none';
      }
    });
  }




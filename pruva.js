document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.comentario-form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const comentarioInput = document.getElementById('comentario');
    const comentariosLista = document.getElementById('comentarios-lista');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const comentario = {
            nombre: nombreInput.value,
            email: emailInput.value,
            comentario: comentarioInput.value
        };

        const response = await fetch('/api/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comentario)
        });

        if (response.ok) {
            nombreInput.value = '';
            emailInput.value = '';
            comentarioInput.value = '';
            loadComentarios();
        }
    });

    async function loadComentarios() {
        const response = await fetch('/api/comentarios');
        const comentarios = await response.json();

        comentariosLista.innerHTML = '';
        comentarios.forEach(com => {
            const comentarioDiv = document.createElement('div');
            comentarioDiv.classList.add('comentario');
            comentarioDiv.innerHTML = `
                <h4>${com.nombre}</h4>
                <p>${com.comentario}</p>
            `;
            comentariosLista.appendChild(comentarioDiv);
        });
    }

    loadComentarios();
});


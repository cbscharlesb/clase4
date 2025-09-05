// Script base para la vista de catálogo
//Aquí deben consumir la API de items y mostrarlos en la página

//Constante con la URL base de la API
const API_URL = "/api/items";

//TODO: Seleccionar el contenedor donde se mostrarán los items
// const catalogContainer = documente.getElementByid("...")
const catalogContainer = document.getElementById("CatalogContainer");
const modal = document.getElementById("itemModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("fechaModal");

//Función principal para cargar los items desde la API

async function loadCatalog() {
    try {
        const response = await fetch(API_URL); // 1. Hacer fetch a la API (GET /api/items)
        const items = await response.json(); // 2. Parsear la respuesta a JSON
        catalogContainer.innerHTML = "";// 3. Limpiar el contenedor del catálogo
        
        // 4. Iterar sobre cada item y llamar a renderItem()
        items.forEach(item => {
            renderItem(item);
        })
        
    } catch (err) {
        console.error("Error cargando catálogo:", err);
        //TODO: Mostrar mensaje de error en la UI
        catalogContainer.innerHTML = `<p class="error">Error al cargar el catálogo: ${err.message}</p>`;
    }
    
}

// Función para renderizar un item en el catálogo
function renderItem(item) {
    const card = document.createElement("div");
    card.className = "catalog-card";
    card.innerHTML = `      
        <div class="card-content">
            <h3>${item.name}</h3>
            <p class="description">${item.description || 'N/A'}</p>
            <p class="precio">${item.precio || 'N/A'}</p>
            <p class="categoria">${item.categoria || 'Sem categoria'}</p>
            <p class="stock">Disponibles: ${item.stock || 0}</p>
            <button class="btn-view" data-id="${item.id}">Ver detalhes</button>
        </div>`;

        card.querySelector('.btn-view').addEventListener('click', () => {
        showItemDetails(item.id);
    });
    
    catalogContainer.appendChild(card);
    
}


async function showItemDetails(itemId) {
    try {
        const response = await fetch(`${API_URL}/${itemId}`);
        const item = await response.json();
        
        modalContent.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Descripción:</strong> ${item.description || 'Sin descripción'}</p>
            <p><strong>Precio:</strong> $${item.precio || 'N/A'}</p>
            <p><strong>Categoria:</strong> ${item.categoria || 'Sin categoria'}</p>
            <p><strong>Stock:</strong> ${item.stock || 0} unidades</p>
            <p><strong>Fecha:</strong> ${item.date || 'No especificada'}</p>`;
        
        modal.style.display = "block";
    } catch (err) {
        console.error("Error cargando detalles:", err);
        modalContent.innerHTML = `<p>Error al cargar los detalles del producto.</p>`;
    }
}

closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

//Inicializar el catálogo cuando cargue la página
loadCatalog();
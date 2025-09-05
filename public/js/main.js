import { getItems, getItem, createItem, deleteItem, updateItem } from "./services/api.js";
import { renderItem, ResetForm, fillForm } from "./ui/ui.js";

const form = document.getElementById("itemForm");
const tableBody = document.getElementById("itemTable");
const submitBtn = document.getElementById("submitBtn");
let editingId = null;

//Eventos de tabla (delegación)

tableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = Number(btn.dataset.id);

    if (btn.classList.contains("btn-delete")) {
        try {
            await deleteItem(id);
            loadItems();
        } catch (err) {
            console.error("error eliminando:", err);
            alert("No se pudo eliminitar el item.");
        }
    } else if (btn.classList.contains("btn-edit")) {
        try {
            if (editingId === id) {
                ResetForm(form, submitBtn);
                editingId = null;
                return;
            }
            const item = await getItem(id);
            fillForm(form, item, submitBtn);
            editingId = id;
        } catch (err) {
            console.error("Error cargando item:", err);
            alert("No se pudo cargar el item para edición.")
        }
    }
});

// Envío del form
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = form.querySelector("#name").value;
    const description = form.querySelector("#description").value;
    const precio = parseFloat(form.querySelector("#precio").value);
    const categoria = form.querySelector("#categoria").value;
    const stock = parseInt(form.querySelector("#stock").value);

    if (!name) {
        alert("El campo nombre es obligatorio!");
        return;
    }

    try {
        if(editingId) {
            await updateItem(editingId, { name, description, precio, categoria, stock });
            editingId = null;
        } else {
            await createItem({ name, description, precio, categoria, stock });
        }

        ResetForm(form, submitBtn);
        loadItems();
    } catch (err) {
        console.error("Error guardando item:", err);
    }
});

// Cargar al inicio
async function loadItems() {
    try {
        const items = await getItems();
        renderItem(items, tableBody);
    } catch (err) {
        console.error("Error cargando lista:", err);
        alert("No se pudieron cargar los items.")
    }
}

loadItems();
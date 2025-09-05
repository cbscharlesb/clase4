const API_URL = "/api/items";

export async function getItems() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al cargar items");
    return res.json();
    
}

export async function getItem(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Item no encontrado");
    return res.json();
    
}

export async function createItem(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al crear item");
    return res.json();
    
}

export async function updateItem(id, data) {
    const res = await fetch (`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error ("Error al actualizar item");
    return res.json();
}

export async function deleteItem(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminiar item");
    return res.json();
    
}
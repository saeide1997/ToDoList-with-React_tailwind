// src/api/assetApi.js
const BASE_URL = "http://localhost:5000/api"; // آدرس سرور Node.js

export async function getItems() {
    const res = await fetch(`${BASE_URL}/items`);
    if (!res.ok) throw new Error("Failed to fetch items");
    return res.json();
}

export async function addItem(item) {
    const res = await fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error("Failed to add item");
    return res.json();
}

// services/api.js
export async function updateItem(id, updates) {
    console.log('updates', id,updates);
    
    const res = await fetch(`${BASE_URL}/items/${id}`, {
        method: 'PUT', // یا PATCH اگر استفاده می‌کنی
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Update failed');
    }
    return res.json(); // باید آیتم آپدیت شده را برگرداند
}

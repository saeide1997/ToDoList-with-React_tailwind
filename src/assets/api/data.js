// src/api/assetApi.js
const BASE_URL = "http://localhost:5000/api"; // آدرس سرور Node.js

export async function login(username, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: "include", // مهم برای httpOnly cookie
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.err || "Failed to login");
    return {res:res, data:data};
}
export async function register(username, password, phone) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        credentials: "include", // مهم برای httpOnly cookie
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, phone })
    });
    
    console.log(res);
    const data = await res.json(); // پاسخ JSON سرور

    if (!res.ok) throw new Error(data.error || "Failed to register");
    return {res:res, data:data} ; // بازگرداندن هر دو data و res
}

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

export async function deleteItem(id) {
    const res = await fetch(`${BASE_URL}/items/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete item");
    return res.json();
}

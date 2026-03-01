import api from "./api";

export async function explainRecommendation(payload) {
    const res = await api.post("/explain-recommendation", payload);
    return res.data;
}


export async function explainProduct(product) {
    const response = await fetch("http://192.168.0.157:8000/api/browse/explain", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            product: product, // 👈 FULL PRODUCT OBJECT
        }),
    });

    if (!response.ok) {
        throw new Error("Explain API failed");
    }

    return response.json();
}

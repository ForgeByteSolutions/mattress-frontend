import api from "./api";

export async function explainRecommendation(payload) {
    const res = await api.post("/explain-recommendation", payload);
    return res.data;
}


export async function explainProduct(product) {
    const response = await api.post("/browse/explain", {
        product: product, // 👈 FULL PRODUCT OBJECT
    });

    return response.data;
}

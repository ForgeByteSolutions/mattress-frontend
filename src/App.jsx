import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatProvider } from "./contexts/ChatContext";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <ChatProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:productId" element={<ProductDetail />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/track/:orderId?" element={<TrackOrder />} />
                        </Routes>
                    </Layout>
                </ChatProvider>
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;

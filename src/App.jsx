import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Products from "./views/Products";
import Login from "./views/Login";
import Register from "./views/Register";
import Checkout from "./views/Checkout";
import AdminDashboard from "./views/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./views/Profile";
import Confirmation from "./views/Confirmation";
import Cart from "./views/Cart";
import ProductDetails from "./views/ProductDetails";

function App() {
  return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Rutas admin protegidas */}
          <Route element={<PrivateRoute adminOnly />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </>
  );
}

export default App;

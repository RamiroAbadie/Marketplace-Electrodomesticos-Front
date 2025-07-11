import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

/* vistas públicas */
import Home from "./views/Home";
import Products from "./views/Products";
import ProductDetails from "./views/ProductDetails";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import Confirmation from "./views/Confirmation";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";

/* autenticación / protección */
import PrivateRoute from "./components/PrivateRoute";

/* panel admin NUEVO */
import AdminLayout from "./views/AdminLayout";
import DashboardHome from "./views/DashBoardHome";
import ProductList from "./views/products/ProductList";
import CategoryList from "./views/categories/CategoryList";
import UserList from "./views/users/UserList";
import UserOrdersList from "./views/users/UserOrdersList";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        {/* ────────── Rutas publicas ────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />

        {/* ────────── Auth ────────── */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
             //<PrivateRoute>
              <Profile />
             //</PrivateRoute>
          }
        />

        {/* ────────── Panel de administracion ────────── */}
        <Route element={<PrivateRoute adminOnly />}>
          {/* layout contenedor con sidebar / appbar */}
          <Route path="/admin/*" element={<AdminLayout />}>
            {/* indice: /admin */}
            <Route index element={<DashboardHome />} />

            {/* sub-rutas: /admin/products, /admin/categories, /admin/users */}
            <Route path="products" element={<ProductList />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id/orders" element={<UserOrdersList />} />
          </Route>
        </Route>

        {/* 404 (para todo el resto) */}
        <Route path="*" element={<h2 style={{ padding: "2rem" }}>404 – Página no encontrada</h2>} />
      </Routes>
    </>
  );
}

export default App;

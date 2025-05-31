import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Products from "./views/Products";
//import Cart from "./views/Cart";
//import Login from "./views/Login";

function App() {
  return (
    <BrowserRouter>
      <NavBar />        {/* único AppBar, fuera de todo */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/**
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

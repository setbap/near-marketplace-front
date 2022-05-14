import "./App.css";
import Navbar from "./components/Navbar";
import { Box, Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddPage from "./pages/AddItem";
import DonatedProducts from "./pages/Donated";
import DetailProduct from "./pages/ProductDetail";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Box w='full'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/donated-products" element={<DonatedProducts />} />
          <Route path="product/:pid" element={<DetailProduct />} />
        </Routes>
      </Box>
      <Footer />

    </>
  );
}

export default App;

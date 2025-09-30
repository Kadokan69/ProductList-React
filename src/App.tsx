import "./App.css";
import { Header } from "./components/Header/Header";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hook";
import { fetchProductsData } from "./slices/productSlice";
import { Route, Routes } from "react-router-dom";
import { CardDetailsPage } from "./pages/CardDetailsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { CreateProductPage } from "./pages/CreateProductPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);


  type NavLink = { title: string; url: string };
  const navLinks: NavLink[] = [
  { title: "Все посты", url: "/products" },
  { title: "Создать пост", url: "/create-product" },
];

  return (
    <>
      <Header links={navLinks} />
      <main className="p-2">
        <Routes>
          <Route path="/" element={<HomePage links={navLinks} />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:productId" element={<CardDetailsPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

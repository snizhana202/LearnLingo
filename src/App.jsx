import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/teachers" element={<div className="container">Teachers page — скоро тут будуть картки</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Teachers from './pages/Teachers/Teachers';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
          </Route>
        </Routes>
           <ToastContainer position="top-center" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

import { Route, Routes } from "react-router-dom"
import Index from "./pages/Index"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import PaymentPage from "./pages/PaymentPage"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/payment/:planId" element={<PaymentPage />} />
      </Routes>
    </>
  )
}

export default App

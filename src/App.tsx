import Index from "./components/pages/Index"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./components/pages/LoginPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App

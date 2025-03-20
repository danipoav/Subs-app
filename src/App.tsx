import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Tech from "./components/Tech";
import ServicesSlider from "./components/ServicesSlider";
import Footer from "./components/Footer";
import Hero2 from "./components/Hero2";


function App() {

  return (
    <>
      <div className=" min-h-screen text-white flex flex-col items-center" style={{ background: "#08090a" }}>
        <div className=" w-full max-w-6xl px-6">
          <Navbar />
        </div>
          <Hero />
        <div className="w-full max-w-6xl px-6">
          <ServicesSlider />
          <Hero2 />
          <Tech />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App

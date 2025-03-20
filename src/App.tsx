import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import heroImage from "./assets/tech.jpg";
import Tech from "./components/Tech";
import ServicesSlider from "./components/ServicesSlider";


function App() {

  return (
    <>
      <div className=" min-h-screen text-white flex flex-col items-center" style={{ background: "#08090a" }}>
        <div className=" w-full max-w-6xl px-6">
          <Navbar />
          <Hero />
        </div>
        <img src={heroImage} alt="Heroimg" className=" w-2/4" style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
        }} />
        <div className="w-full max-w-6xl px-6">
          <ServicesSlider />
          <Tech />
        </div>
      </div>
    </>
  )
}

export default App

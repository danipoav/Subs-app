import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import heroImage from "./assets/tech.jpg";
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
          <Hero />
        </div>
        <img src={heroImage} alt="Heroimg" className=" w-full" style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          height: "600px"
        }} />
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

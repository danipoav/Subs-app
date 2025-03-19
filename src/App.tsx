import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import heroImage from "./assets/prueba2.webp";


function App() {

  return (
    <>
      <div className=" min-h-screen text-white flex flex-col items-center bg-black">
        <div className=" w-full max-w-6xl px-6">
          <Navbar />
          <Hero />
        </div>
        <img src={heroImage} alt="Heroimg" className=" w-2/4" style={{
          WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 95%)",
          maskImage: "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)",
        }}/>
      </div>
    </>
  )
}

export default App

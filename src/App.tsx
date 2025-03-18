import Hero from "./components/Hero"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <div style={{ background: "#08090a" }} className=" min-h-screen text-white flex flex-col items-center">
        <div className=" w-full max-w-5xl px-6">
          <Navbar />
          <Hero />
        </div>
      </div>
    </>
  )
}

export default App

import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <div className=" min-h-screen bg-gray-900 text-white flex flex-col items-center">
        Hola
        <div className=" w-full max-w-5xl px-6">
          <Navbar />
        </div>
      </div>
    </>
  )
}

export default App

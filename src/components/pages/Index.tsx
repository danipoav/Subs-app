import Footer from "../Footer";
import Hero from "../Hero";
import Hero2 from "../Hero2";
import Navbar from "../Navbar";
import ServicesSlider from "../ServicesSlider";
import Tech from "../Tech";

export default function Index() {
  return (
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
  )
}

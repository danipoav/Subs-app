import Footer from "../components/Footer";
import GraphicComponent from "../components/GraphicComponent";
import Hero from "../components/Hero";
import Hero2 from "../components/Hero2";
import Navbar from "../components/Navbar";
import ServicesSlider from "../components/ServicesSlider";
import SubscriptionComponent from "../components/SubscriptionComponent";
import Tech from "../components/Tech";


export default function Index() {

  return (
    <>
      <div className=" min-h-screen text-white flex flex-col items-center" style={{ background: "#08090a" }}>
        <div className=" w-full max-w-6xl px-6">
          <Navbar />
        </div>
        <Hero />
        <div className="w-full max-w-6xl px-6">
          <ServicesSlider />
          <SubscriptionComponent />
          <GraphicComponent />
          <Hero2 />
          <Tech />
        </div>
        <Footer />
      </div>
    </>
  )
}

import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import GraphicComponent from "../components/GraphicComponent";
import Hero from "../components/Hero";
import Hero2 from "../components/Hero2";
import Navbar from "../components/Navbar";
import ServicesSlider from "../components/ServicesSlider";
import SubscriptionComponent from "../components/SubscriptionComponent";
import Tech from "../components/Tech";
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from "../features/store";
import { useRef } from "react";

export default function Index() {

  const status = useSelector((state: RootState) => state.auth.status)
  const servicesRef = useRef<HTMLDivElement>(null);
  const manageRef = useRef<HTMLDivElement>(null);
  const subsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className=" min-h-screen text-white flex flex-col items-center" style={{ background: "#08090a" }}>
        <div className=" w-full max-w-6xl px-6">
          <Navbar servicesRef={servicesRef} manageRef={manageRef} subsRef={subsRef}/>
        </div>
        <Hero servicesRef={servicesRef} />
        <div className="w-full max-w-6xl px-6">
          <ServicesSlider ref={servicesRef} />
          {status === 'authenticated' ? (<>
            <SubscriptionComponent ref={subsRef}/>
            <GraphicComponent /></>) : ''}
          <Hero2 ref={manageRef} />
          <Tech />
        </div>
        <Footer />
      </div>
    </>
  )
}

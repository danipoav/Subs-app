import { useEffect, useState } from "react"
import heroImage from "../assets/tech.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

interface HeroProps {
  servicesRef: React.RefObject<HTMLDivElement | null>;
}

export default function Hero({ servicesRef }: HeroProps) {

  const [isVisible, setIsVisible] = useState(false);
  const { status, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500)
  }, [])

  const showServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <section className="w-full max-w-6xl mx-auto text-left px-6 pt-32 md:pt-40">
        <h1 className={`text-3xl sm:text-4xl md:text-6xl font-bold transition-all duration-1000 max-w-4xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {status === 'authenticated'
            ? `Welcome back, ${user?.name}. Ready to take control?`
            : 'Simplify Your Subscription Management'
          }
        </h1>

        <p className={`mt-4 text-md sm:text-lg md:text-xl max-w-2xl text-left transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ color: "#8a8f98" }}>
          {status === 'authenticated'
            ? 'Take charge of your digital services with confidence. Our platform centralizes all your recurring subscriptions, giving you full visibility and control. From budgeting to smart reminders.'
            : 'Manage all your subscriptions in one place. Our platform helps you track, optimize, and automate your recurring services with ease. Never miss a payment again and stay in control of your expenses effortlessly.'
          }
        </p>

        <div className={`${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} pt-5 transition-all duration-1000 delay-700`}>
          <button
            onClick={showServices}
            className="bg-gray-300 text-black px-6 py-3 rounded-md hover:bg-white transition-all text-sm sm:text-base cursor-pointer"
          >
            Watch Services
          </button>
        </div>
      </section>

      <img
        src={heroImage}
        alt="Heroimg"
        className={`w-full delay-1200 duration-1000 transition-all   ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          height: "465px",
        }}
      />

    </>
  )
}

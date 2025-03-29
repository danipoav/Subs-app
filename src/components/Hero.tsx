import { useEffect, useState } from "react"
import heroImage from "../assets/tech.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";


export default function Hero() {

    const [isVisible, setIsVisible] = useState(false);
    const { status, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 500)
    }, [])

    return (
        <>
            <section className="w-full max-w-6xl mx-auto text-left pt-35 px-6">
                <h1 className={`text-4xl md:text-6xl font-bold transition-all duration-1000 max-w-4xl${isVisible ? " opacity-100 translate-y-0" : " opacity-0 translate-y-10"}`}>{
                    status === 'authenticated' ? `Welcome back, ${user?.name}. Ready to take control?` : 'Simplify Your Subscription Management'
                }</h1>
                <p className={`mt-4 text-lg md:text-xl max-w-2xl text-left transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ color: "#8a8f98" }}>
                    {status === 'authenticated' ? 'Take charge of your digital services with confidence. Our platform centralizes all your recurring subscriptions, giving you full visibility and control. From budgeting to smart reminders.'
                        : 'Manage all your subscriptions in one place. Our platform helps you track, optimize, and automate your recurring services with ease. Never miss a payment again and stay in control of your expenses effortlessly.'}
                </p>
                <div className={`${isVisible ? " opacity-100 translate-y-0" : "opacity-0 translate-y-10"} pt-5 transition-all duration-1000 delay-700`}>
                    <button className={`bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-white transition-all cursor-pointer`}>
                        Watch Services
                    </button>
                </div>
            </section>
            <img src={heroImage} alt="Heroimg" className={` w-full delay-1200 duration-1000 transition-all${isVisible ? " opacity-100 translate-y-0" : " opacity-0 translate-y-10"}`} style={{
                WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
                maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
                height: "500px"
            }} />
        </>
    )
}

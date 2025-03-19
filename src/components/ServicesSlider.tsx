import { useState } from "react";

export default function ServicesSlider() {

    const [currentIndex, setCurrentIndex] = useState(0);

    const services = [
        {
            title: "Premium Streaming",
            description: "Unlimited access to exclusive content and premium features.",
            price: "$9.99/month",
        },
        {
            title: "Cloud Storage Pro",
            description: "1TB of cloud storage with secure encryption.",
            price: "$5.99/month",
        },
        {
            title: "AI Assistant",
            description: "Personal AI assistant for daily tasks and automation.",
            price: "$12.99/month",
        },
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? services.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === services.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <>
            <section className=" w-full flex flex-col items-center py-16 ">
                <h2 className=" text-2xl md:text-4xl font-bold text-white mb-8">Our Services</h2>

                <div className=" relative w-full max-w-xl overflow-hidden">
                    <div className=" flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {services.map((service, index) => (
                            <div key={index} className=" min-w-full bg-gray-600 p-6 rounded-2xl shadow-lg text-white text-center">
                                <h3 className=" text-2xl font-semibold">{service.title}</h3>
                                <p className=" mt-2">{service.description}</p>
                                <p className=" mt-4 text-lg font-bold">{service.price}</p>
                            </div>
                        ))}
                    </div>

                    <button onClick={handlePrev} className="absolute top-1/2 left-1 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-300">
                        ❮
                    </button>

                    <button onClick={handleNext} className="absolute top-1/2 right-1 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-300">
                        ❯
                    </button>

                </div>
            </section>
        </>
    )
}

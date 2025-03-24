import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store";
import { getAllServices } from "../features/services/serviceThunk";

export default function ServicesSlider() {

    const services = useSelector((state: RootState) => state.service.services);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllServices());
    }, [])

    const [currentIndex, setCurrentIndex] = useState(0);

    // const services = [
    //     {
    //         title: "Premium Streaming",
    //         description:
    //             "Spotify is a leading digital music streaming service that gives users access to millions of songs, podcasts, and audio content. With both free and premium options, it allows users to discover, share, and enjoy music anytime, anywhere.",
    //         price: "$9.99/month",
    //         image: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png",
    //     },
    //     {
    //         title: "Cloud Storage Pro",
    //         description: "1TB of cloud storage with secure encryption.",
    //         price: "$5.99/month",
    //         image: "https://via.placeholder.com/150", 
    //     },
    //     {
    //         title: "AI Assistant",
    //         description: "Personal AI assistant for daily tasks and automation.",
    //         price: "$12.99/month",
    //         image: "https://via.placeholder.com/150",
    //     },
    // ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? services.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === services.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <>
            <section className=" w-full flex flex-col items-center py-16 pt-0 ">

                <div className=" relative w-full  overflow-hidden">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`min-w-full bg-black p-18 pb-24 rounded-2xl shadow-lg text-white flex items-center gap-6 opacity-0 translate-y-6 transition-opacity duration-700 ease-out ${index === currentIndex ? "opacity-100 translate-y-0" : ""
                                    }`}
                            >

                                <img src={service.logo} alt="Service" className="w-40 h-40 object-contain" />


                                <div className="flex-1 text-left">
                                    <h3 className="text-2xl font-semibold">{service.name}</h3>
                                    <p className="mt-2 mb-3 text-justify" style={{ color: "#8a8f98" }}>{service.description}</p>
                                    <div className="flex justify-between">
                                        <select name="" id="" className=" cursor-pointer">
                                            <option value="">{"20$"}</option>
                                        </select>
                                        <button className=" cursor-pointer px-4 py-2 bg-white text-black rounded-lg text-1xl">Subscribe</button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={handlePrev} className="btn-slide absolute top-1/2 left-1 -translate-y-1/2  px-4 py-2 rounded-full shadow-md">
                        ❮
                    </button>

                    <button onClick={handleNext} className="absolute top-1/2 right-1 -translate-y-1/2 px-4 py-2 rounded-full shadow-md btn-slide">
                        ❯
                    </button>

                </div>
            </section>
        </>
    )
}

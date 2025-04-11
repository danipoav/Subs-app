import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store";
import { getAllServices } from "../features/services/serviceThunk";
import { getAllPlans } from "../features/plans/planThunk";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    ref: React.RefObject<HTMLDivElement | null>;
}

export default function ServicesSlider({ ref }: NavbarProps) {

    const services = useSelector((state: RootState) => state.service.services);
    const plans = useSelector((state: RootState) => state.plan.plans);
    const { status, user } = useSelector((state: RootState) => state.auth);
    const allSubscriptions = useSelector((state: RootState) => state.subscription.subscriptions);
    const userSubscriptions = allSubscriptions.filter((sub) => sub.user.id === user?.id)
    const planLoading = useSelector((state: RootState) => state.plan.loading);
    const serviceLoading = useSelector((state: RootState) => state.service.loading);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [selectedPlan, setSelectedPlan] = useState<{ [serviceId: number]: number }>({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentService = services[currentIndex];

    useEffect(() => {
        dispatch(getAllServices());
        dispatch(getAllPlans());
    }, [])

    useEffect(() => {
        const currentService = services[currentIndex];
        if (!currentService) return;

        const servicePlans = plans.filter(plan => plan.service.id === currentService.id);

        if (servicePlans.length > 0 && !selectedPlan[currentService.id]) {
            setSelectedPlan(prev => ({
                ...prev,
                [currentService.id]: servicePlans[0].id,
            }));
        }
    }, [currentIndex, services, plans])


    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? services.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === services.length - 1 ? 0 : prevIndex + 1));
    };

    const isServiceSubscribed = (serviceId: number) => {
        return userSubscriptions.some((sub) => sub.plan.service.id === serviceId)
    }

    return (
        <>
            <section ref={ref} className=" scroll-mt-20 w-full flex flex-col items-center py-16 pt-0 ">
                {planLoading || serviceLoading ?
                    <svg className="svgLoad" viewBox="25 25 50 50">
                        <circle className="circleLoad" r="20" cy="50" cx="50"></circle>
                    </svg> :
                    <div className=" relative w-full  overflow-hidden">
                        <div 
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {services.map((service, index) => {

                                const subscribed = isServiceSubscribed(service.id)

                                return ((
                                    <div
                                        key={index}
                                        className={`min-w-full bg-black p-18 pb-24 rounded-2xl shadow-lg text-white flex items-center gap-6 opacity-0 translate-y-6 transition-opacity duration-700 ease-out ${index === currentIndex ? "opacity-100 translate-y-0" : ""
                                            }`}
                                    >

                                        <img src={service.logo} alt="Service" className={` w-40 h-40 object-contain`} />


                                        <div className="flex-1 text-left">
                                            <h3 className="text-2xl font-semibold">{service.name}</h3>
                                            <p className="mt-2 pb-10 text-justify" style={{ color: "#8a8f98" }}>{service.description}</p>
                                            <div className="flex justify-between">
                                                <select name="" className=" cursor-pointer px-2 py-2 rounded-lg" onChange={(e) =>
                                                    setSelectedPlan((prev) => ({
                                                        ...prev,
                                                        [currentService.id]: Number(e.target.value),
                                                    }))
                                                }>
                                                    {plans.filter(plan => plan.service.id === service.id).map(plan => (
                                                        <option className=" bg-gray-500 cursor-pointer" key={plan.id} value={plan.id}>{plan.name}</option>
                                                    ))}
                                                </select>
                                                <button disabled={subscribed} className={`cursor-pointer px-4 py-2  text-black rounded-lg text-1xl ${subscribed ? ' px-12 bg-gray-500' : ' bg-white'}`} onClick={() => status === 'authenticated' ? navigate(`/payment/${selectedPlan[currentService.id]}`) : navigate('/login')}>{subscribed ? <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M7 2a2 2 0 0 0-2 2v1h4V4a2 2 0 0 0-2-2M3 4v1a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 3 14h8a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 11 5V4a4 4 0 1 0-8 0m4 6.75a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5" clipRule="evenodd" /></svg>

                                                    : 'Subscribe'}</button>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            })}
                        </div>

                        <button onClick={handlePrev} className="btn-slide absolute top-1/2 left-1 -translate-y-1/2  px-4 py-2 rounded-full shadow-md">
                            ❮
                        </button>

                        <button onClick={handleNext} className="absolute top-1/2 right-1 -translate-y-1/2 px-4 py-2 rounded-full shadow-md btn-slide">
                            ❯
                        </button>

                    </div>
                }

            </section>

        </>
    )
}

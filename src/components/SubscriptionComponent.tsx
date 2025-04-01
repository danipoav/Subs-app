import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../features/store"
import { useEffect } from "react";
import { getSubsByUserId } from "../features/subscriptions/subscriptionsThunk";
import { useNavigate } from "react-router-dom";
import { getAllPayments } from "../features/payment/paymentThunk";

export default function SubscriptionComponent() {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const subscriptions = useSelector((state: RootState) => state.subscription.subscriptions);
    const payments = useSelector((state: RootState) => state.payment.payments)

    useEffect(() => {
        dispatch(getAllPayments())
        userId && dispatch(getSubsByUserId(userId));
    }, [])

    return (
        <section className="w-full flex flex-col items-center rounded-lg py-10 px-6">
            <h1 className="text-3xl font-bold mb-8 text-white">Your Subscriptions</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full ">
                {subscriptions.map((subs) => {

                    const payment = payments.find((p) => p.subscribe.id === subs.id)

                    return (
                        <div key={subs.id} className="bg-black p-6 rounded-lg shadow-md text-white flex items-center gap-4">
                            <img
                                src={subs.plan.service.logo}
                                alt={subs.plan.service.name}
                                className="w-16 h-16 object-contain"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">{subs.plan.service.name} – {subs.plan.name}</h2>
                                <p className="text-sm text-gray-400">
                                    Starts: {new Date(subs.start_date).toLocaleDateString()} | Renewal:{" "}
                                    {new Date(subs.renewal_date).toLocaleDateString()}
                                </p>
                                {payment && (
                                    <span
                                        className={`inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full ${payment.state === 'Pagado'
                                            ? "bg-green-600 text-white"
                                            : "bg-yellow-500 text-black"
                                            }`}
                                    >
                                        {payment.state}
                                    </span>
                                )}
                            </div>

                            {payment?.state === 'Pendiente' && (
                                <button
                                    className="bg-white text-black px-3 py-1 rounded-md text-sm hover:bg-gray-200"
                                    onClick={() => navigate(`/payment?planId=${subs.plan.id}`)}
                                >
                                    Pay now
                                </button>
                            )}
                            <button className=" cursor-pointer hover:text-green-600"><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20"><path fill="currentColor" d="M11.67 8.537a.3.3 0 0 0-.302.296v2.212a.3.3 0 0 0 .303.296h6.663a.3.3 0 0 0 .303-.296V8.833a.3.3 0 0 0-.303-.296zm4.086-7.036c.922.044 1.585.226 2.005.612c.415.382.628.935.67 1.667v2.097a.674.674 0 0 1-.681.666a.674.674 0 0 1-.682-.666l.001-2.059c-.022-.38-.113-.616-.243-.736c-.126-.116-.51-.22-1.103-.25H2.647c-.537.02-.886.122-1.055.267c-.13.111-.228.417-.229.946l-.003 11.77c.05.514.163.857.308 1.028c.11.13.451.26.953.324h13.116c.614.012.976-.08 1.098-.203c.135-.137.233-.497.233-1.086v-2.045c0-.367.305-.666.682-.666c.376 0 .681.299.681.666v2.045c0 .9-.184 1.573-.615 2.01c-.444.45-1.15.63-2.093.61L2.54 18.495c-.897-.104-1.54-.35-1.923-.803c-.347-.41-.54-.995-.617-1.813V4.044c.002-.876.212-1.535.694-1.947c.442-.38 1.08-.565 1.927-.597zm2.578 5.704c.92 0 1.666.729 1.666 1.628v2.212c0 .899-.746 1.628-1.666 1.628h-6.663c-.92 0-1.666-.73-1.666-1.628V8.833c0-.899.746-1.628 1.666-1.628zm-4.997 1.94c-.46 0-.833.36-.833.803s.373.803.833.803s.833-.36.833-.803s-.373-.804-.833-.804" /></svg></button>
                            <button className=" cursor-pointer hover:text-red-600"><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 17 17"><path fill="currentColor" fillRule="evenodd" d="m12.566 8l3.045-3.044c.42-.421.42-1.103 0-1.522L12.566.389a1.08 1.08 0 0 0-1.523 0L7.999 3.433L4.955.389a1.08 1.08 0 0 0-1.523 0L.388 3.434a1.074 1.074 0 0 0-.001 1.522L3.431 8L.387 11.044a1.075 1.075 0 0 0 .001 1.523l3.044 3.044c.42.421 1.102.421 1.523 0l3.044-3.044l3.044 3.044a1.076 1.076 0 0 0 1.523 0l3.045-3.044c.42-.421.42-1.103 0-1.523z" /></svg></button>
                        </div>
                    )
                })}

            </div>
        </section>
    )
}
//Empezar a crear los botones y usar el map para que coincidan los payments con las suscripciones
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
        <section className="w-full flex flex-col items-center bg-black rounded-lg py-16 px-6">
            <h1 className="text-3xl font-bold mb-8 text-white">Your Subscriptions</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {subscriptions.map((subs) => (
                    <div key={subs.id} className="bg-gray-900 p-6 rounded-lg shadow-md text-white flex items-center gap-4">
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

                        </div>


                    </div>
                ))}
            </div>
        </section>
    )
}
//Empezar a crear los botones y usar el map para que coincidan los payments con las suscripciones
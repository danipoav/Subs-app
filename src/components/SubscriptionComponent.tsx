import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../features/store"
import { useEffect } from "react";
import { deleteSubById, getSubsByUserId } from "../features/subscriptions/subscriptionsThunk";
import { useNavigate } from "react-router-dom";
import { deletPaymentBySubId, getAllPayments } from "../features/payment/paymentThunk";

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

    const handleDeleteSubs = async (sub_id: number) => {
        try {
            await dispatch(deletPaymentBySubId(sub_id));
            await dispatch(deleteSubById(sub_id));
            await dispatch(getAllPayments())
            userId && await dispatch(getSubsByUserId(userId));
        } catch (error) {
            console.log(error)
        }
    }

    if (subscriptions.length === 0) {
        return (
            <div className="w-full text-center py-20 text-gray-400 flex flex-col items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="mb-4 text-gray-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h2 className="text-xl font-semibold">No subscriptions yet</h2>
                <p className="text-sm mt-2">You haven’t subscribed to any service yet. Explore and pick your first one!</p>
            </div>
        );
    }

    return (
        <section className="w-full flex flex-col items-center rounded-lg py-10 px-6">
            <h1 className="text-3xl font-bold mb-8 text-white">Subscriptions</h1>

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
                                    className="bg-gray-300 text-black px-3 py-1 rounded-md text-sm hover:bg-white cursor-pointer"
                                    onClick={() => navigate(`/payment?planId=${subs.plan.id}`)}
                                >
                                    Pay now
                                </button>
                            )}
                            <button onClick={() => handleDeleteSubs(subs.id)} className=" text-red-800 cursor-pointer hover:text-red-600"><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 17 17"><path fill="currentColor" fillRule="evenodd" d="m12.566 8l3.045-3.044c.42-.421.42-1.103 0-1.522L12.566.389a1.08 1.08 0 0 0-1.523 0L7.999 3.433L4.955.389a1.08 1.08 0 0 0-1.523 0L.388 3.434a1.074 1.074 0 0 0-.001 1.522L3.431 8L.387 11.044a1.075 1.075 0 0 0 .001 1.523l3.044 3.044c.42.421 1.102.421 1.523 0l3.044-3.044l3.044 3.044a1.076 1.076 0 0 0 1.523 0l3.045-3.044c.42-.421.42-1.103 0-1.523z" /></svg></button>
                        </div>
                    )
                })}

            </div>
        </section>
    )
}
//Ahora crear la funcionalidad de borrar una suscripcion, funcianolidad del boton pay now, y crear mas servicios
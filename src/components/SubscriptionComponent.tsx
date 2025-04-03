import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../features/store"
import { useEffect, useState } from "react";
import { deleteSubById, getSubsByUserId } from "../features/subscriptions/subscriptionsThunk";
import { deletPaymentBySubId, getAllPayments, updatePayment } from "../features/payment/paymentThunk";
import UnsubscribeModal from "./UnsubscribeModal";
import { PaymentUpdate } from "../features/payment/paymentSlice";
import { resetAuthState } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function SubscriptionComponent() {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const subscriptions = useSelector((state: RootState) => state.subscription.subscriptions);
    const payments = useSelector((state: RootState) => state.payment.payments)

    const [showModal, setShowModal] = useState(false);
    const [selectedName, setSelectedName] = useState('');
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getAllPayments()).unwrap().catch(() => { dispatch(resetAuthState()); navigate('/') })
        userId && dispatch(getSubsByUserId(userId));
    }, [])

    const handleDeleteSubs = async (sub_id: number) => {
        try {
            await dispatch(deletPaymentBySubId(sub_id)).unwrap().catch(() => { dispatch(resetAuthState()); navigate('/') });
            await dispatch(deleteSubById(sub_id));
            await dispatch(getAllPayments())
            userId && await dispatch(getSubsByUserId(userId));
            toast.success("Subscription removed successfully!")
        } catch (error) {
            console.log(error)
        }
    }

    const handlePayNow = async (id: number, request: PaymentUpdate) => {
        try {
            await dispatch(updatePayment({ id, request }))
            await dispatch(getAllPayments())
        } catch (error) {
            console.log(error)
        }
    }

    if (authStatus !== 'authenticated') {
        return null;
    } else {
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
            <>
                <section className="w-full flex flex-col items-center rounded-lg py-10 px-6">
                    <h1 className="text-3xl font-bold mb-8 text-white border-b border-gray-700 pb-4 w-full text-center">Subscriptions</h1>

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
                                            Starts: {subs.startDate} | Renewal:{" "}
                                            {subs.renewalDate}
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
                                            onClick={() => handlePayNow(payment.id, {
                                                paymentDate: new Date(),
                                                subscribe: subs.id,
                                                state: 'Pagado'
                                            })}
                                        >
                                            Pay now
                                        </button>
                                    )}
                                    <button onClick={() => {
                                        setSelectedId(subs.id);
                                        setSelectedName(subs.plan.service.name);
                                        setShowModal(true);
                                    }} className=" text-red-800 cursor-pointer hover:text-red-600 text-xl">🗑️</button>
                                </div>
                            )
                        })}

                    </div>
                </section>

                <UnsubscribeModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    serviceName={selectedName}
                    onConfirm={async () => {
                        if (selectedId !== null) {
                            await handleDeleteSubs(selectedId);
                            setShowModal(false);
                        }
                    }}
                />

            </>


        )
    }


}

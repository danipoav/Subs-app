import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../features/store"
import { useEffect, useState } from "react";
import { deleteSubById, getSubsByUserId, updateSubscription } from "../features/subscriptions/subscriptionsThunk";
import { deletPaymentBySubId, getAllPayments, updatePayment } from "../features/payment/paymentThunk";
import UnsubscribeModal from "./UnsubscribeModal";
import { PaymentUpdate } from "../features/payment/paymentSlice";
import { resetAuthState } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import EditSubsModal from "./EditSubsModal";
import { Subscription } from "../features/subscriptions/subscriptionsSlice";
import { getAllPlans } from "../features/plans/planThunk";


interface SubsProps {
    ref: React.RefObject<HTMLDivElement | null>;
}

export default function SubscriptionComponent({ ref }: SubsProps) {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const subscriptions = useSelector((state: RootState) => state.subscription.subscriptions);
    const payments = useSelector((state: RootState) => state.payment.payments)
    const plans = useSelector((state: RootState) => state.plan.plans);

    const [showModal, setShowModal] = useState(false);
    const [selectedName, setSelectedName] = useState('');
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [editModal, setEditModal] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
    const [selectedPlanId, setSelectedPlanId] = useState<number>(0);


    useEffect(() => {
        // dispatch(getAllPayments()).unwrap().catch(() => { dispatch(resetAuthState()); navigate('/') })
        dispatch(getAllPayments())
        dispatch(getAllPlans())
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

    const handleConfirmEdit = async (newPlanId: number) => {
        try {
            await dispatch(updateSubscription({ id: selectedSubscription?.id, request: { plan_id: newPlanId } }))
            await dispatch(getAllPayments())
            await dispatch(getAllPlans())
            setEditModal(false);
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
                <section ref={ref} className="scroll-mt-16 w-full flex flex-col items-center rounded-lg py-10 px-6">
                    <h1 className="text-3xl font-bold mb-8 text-white border-b border-gray-700 pb-4 w-full text-center">Subscriptions</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full ">
                        {subscriptions.map((subs) => {

                            const today = new Date();
                            const renewalDate = new Date(subs.renewal_date);

                            const timeDiff = renewalDate.getTime() - today.getTime();
                            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                            const payment = payments.find((p) => p.subscription.id === subs.id)

                            if (payment?.state === 'Pending' && renewalDate.getTime() < today.getTime()) {
                                handleDeleteSubs(subs.id);
                                return null;
                            }

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
                                            Starts: {new Date(subs.start_date).toLocaleDateString('en-US')} | Renewal:{" "}
                                            {new Date(subs.renewal_date).toLocaleDateString('en-US')}
                                        </p>
                                        {payment && (
                                            <span
                                                className={`inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full ${payment.state === 'Paid'
                                                    ? "bg-green-600 text-white"
                                                    : "bg-yellow-500 text-black"
                                                    }`}
                                            >
                                                {payment.state}
                                            </span>
                                        )}
                                    </div>

                                    {
                                        daysLeft <= 7 && daysLeft > 0 && (
                                            <p className="text-yellow-400 text-xs mt-2">
                                                Your subscription expires in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
                                            </p>
                                        )
                                    }

                                    {payment?.state === 'Pending' && (
                                        <button
                                            className="bg-gray-300 text-black px-3 py-1 rounded-md text-sm hover:bg-white cursor-pointer"
                                            onClick={() => handlePayNow(payment.id, {
                                                payment_date: new Date(),
                                                subscription: subs.id,
                                                state: 'Paid'
                                            })}
                                        >
                                            Pay now
                                        </button>
                                    )}
                                    <button onClick={() => {
                                        setSelectedSubscription(subs)
                                        setSelectedPlanId(subs.plan.id)
                                        setEditModal(true)
                                    }}>
                                        <FiEdit className="text-2xl cursor-pointer" />
                                    </button>

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

                {<EditSubsModal
                    open={editModal}
                    onClose={() => setEditModal(false)}
                    onConfirm={handleConfirmEdit}
                    currentPlanName={selectedSubscription?.plan.name ?? ""}
                    plans={plans.filter(plan => plan.service.id === selectedSubscription?.plan.service.id)}
                    selectedPlanId={selectedPlanId}
                    setSelectedPlanId={setSelectedPlanId}
                />}
            </>
        )
    }


}

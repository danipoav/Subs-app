import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../features/store";
import { getPlanById } from "../features/plans/planThunk";
import { createSubscription } from "../features/subscriptions/subscriptionsThunk";
import { createPayment } from "../features/payment/paymentThunk";
import { resetAuthState } from "../features/auth/authSlice";
import { toast } from "react-toastify";


export default function PaymentPage() {

    const dispatch = useDispatch<AppDispatch>()
    const { planId } = useParams();
    const navigate = useNavigate();

    const plan = useSelector((state: RootState) => state.plan.planById);
    const user = useSelector((state: RootState) => state.auth.user);
    const startDate = new Date()
    const nextMonth = new Date();
    const nextYear = new Date();
    const [isVisible, setIsVisible] = useState(false);

    nextMonth.setMonth(nextMonth.getMonth() + 1)
    nextYear.setFullYear(nextYear.getFullYear() + 1)

    const monthRenewalDate = nextMonth;
    const yearRenewalDate = nextYear;

    useEffect(() => {
        dispatch(getPlanById(Number(planId))).unwrap().catch(() => {
            dispatch(resetAuthState());
            navigate("/login");
        });
        setTimeout(() => setIsVisible(true), 200)
    }, [])

    const handlePayment = async (payState: 'Paid' | 'Pending') => {

        if (plan && user) {
            const result = await dispatch(createSubscription({
                plan_id: plan.id,
                user_id: user.id,
                start_date: startDate,
                renewal_date: plan.name === 'Mensual' ? monthRenewalDate : yearRenewalDate
            })).unwrap();

            const subId = result.id;

            await dispatch(createPayment({
                amount: plan.price,
                payment_date: startDate,
                subscribe_id: subId,
                state: payState
            }))

            if (payState === 'Paid') {
                toast.success('Subscription created successfully')
            } else {
                toast.warning('Subscription created successfully, Pending to pay')
            }
        }
        navigate('/');
    }

    return (
        <div className={`min-h-screen text-white flex items-center justify-center px-4`} style={{ background: "#08090a" }}>
            <div className={`bg-black p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : " opacity-0 translate-x-10"}`}>
                <img src={plan?.service.logo} alt={plan?.service.name} className="w-20 h-20 mx-auto" />
                <h2 className="text-2xl font-bold">{plan?.service.name} – {plan?.name}</h2>
                <p className="text-gray-400">You’re about to subscribe to the <span className="text-white font-semibold">{plan?.name}</span> plan for <span className="text-white">${plan?.price}</span>.</p>

                <p className="text-sm text-gray-500">Billing cycle: {plan?.period}</p>

                <button
                    onClick={() => handlePayment("Paid")}
                    className="w-full bg-white text-black py-2 rounded-md mb-3 cursor-pointer hover:bg-gray-200 transition"
                >
                    Confirm Payment
                </button>
                <button
                    onClick={() => handlePayment("Pending")}
                    className="w-full border border-gray-500 text-white py-2 rounded-md cursor-pointer hover:bg-gray-950 transition"
                >
                    Pay Later
                </button>
            </div>
        </div>

    )
}

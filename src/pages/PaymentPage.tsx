import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../features/store";
import { getPlanById } from "../features/plans/planThunk";
import { SubscriptionCreate } from "../features/subscriptions/subscriptionsSlice";

export default function PaymentPage() {

    const dispatch = useDispatch<AppDispatch>()
    const { planId } = useParams();

    const plan = useSelector((state: RootState) => state.plan.planById);
    const user = useSelector((state: RootState) => state.auth.user);
    const startDate = new Date().toISOString()
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    const renewalDate = nextMonth.toISOString();

    useEffect(() => {
        dispatch(getPlanById(Number(planId)));
        console.log(startDate, renewalDate);
    }, [])

    const handleFakePayment = () => {

    }

    return (
        <div className="min-h-screen text-white flex items-center justify-center px-4" style={{ background: "#08090a" }}>
            <div className="bg-black p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-6">
                <img src={plan?.service.logo} alt={plan?.service.name} className="w-20 h-20 mx-auto" />
                <h2 className="text-2xl font-bold">{plan?.service.name} – {plan?.name}</h2>
                <p className="text-gray-400">You’re about to subscribe to the <span className="text-white font-semibold">{plan?.name}</span> plan for <span className="text-white">${plan?.price}</span>.</p>

                <p className="text-sm text-gray-500">Billing cycle: {plan?.period}</p>

                <button
                    //   onClick={handleFakePayment}
                    className="w-full bg-white text-black py-2 rounded-md mb-3 cursor-pointer hover:bg-gray-200 transition"
                >
                    Confirm Payment
                </button>
                <button
                    // onClick={() => handlePayment("Pending")}
                    className="w-full border border-gray-500 text-white py-2 rounded-md cursor-pointer hover:bg-gray-950 transition"
                >
                    Pay Later
                </button>
            </div>
        </div>

    )
}

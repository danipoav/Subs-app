import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../features/store";
import { getPlanById } from "../features/plans/planThunk";

export default function PaymentPage() {

    const dispatch = useDispatch<AppDispatch>()

    const { planId } = useParams();
    const plan = useSelector((state: RootState) => state.plan.planById);

    useEffect(() => {
        dispatch(getPlanById(Number(planId)));
    }, [])


    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-6">
                {plan?.name}
            </div>
        </div>

    )
}

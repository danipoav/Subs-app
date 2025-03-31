import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../features/store"
import { useEffect } from "react";
import { getSubsByUserId } from "../features/subscriptions/subscriptionsThunk";

export default function SubscriptionComponent() {

    const dispatch = useDispatch<AppDispatch>()

    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const subscriptions = useSelector((state: RootState) => state.subscription.subscriptions);

    useEffect(() => {
        userId && dispatch(getSubsByUserId(userId));
    }, [])

    return (
        <section className=" w-full flex flex-col items-center bg-black rounded-lg py-16">
            <h1 className=" text-2xl font-semibold">Your Subscriptions</h1>
            {subscriptions.map((subs) => (
                <div key={subs.id}>
                    {subs.plan.name}
                </div>
            ))}
        </section>
    )
}

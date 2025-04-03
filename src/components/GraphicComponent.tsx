import { useSelector } from "react-redux";
import { RootState } from "../features/store"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

export default function GraphicComponent() {

    const payments = useSelector((state: RootState) => state.payment.payments);
    const subscriptions = useSelector((state: RootState) => state.subscription.subscriptions);
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const status = useSelector((state: RootState) => state.auth.status);

    const userSubsId = useMemo(
        () => subscriptions.filter(sub => sub.user.id === userId).map(sub => sub.id),
        [subscriptions, userId]
    );

    const userPayments = useMemo(
        () => payments.filter(p => p.state === "Pagado" && userSubsId.includes(p.subscribe.id)),
        [payments, userSubsId]
    )

    const spendingByService = useMemo(() => {
        const serviceTotals: Record<string, number> = {};

        userPayments.forEach((payment) => {
            const serviceName = payment.subscribe.plan.service.name;
            if (!serviceTotals[serviceName]) serviceTotals[serviceName] = 0;
            serviceTotals[serviceName] += payment.amount;
        });

        return Object.entries(serviceTotals).map(([name, amount]) => ({
            name,
            amount
        }));
    }, [userPayments])

    if (status === 'authenticated') {
        if (userPayments.length === 0) {
            return null;
        } else {
            return (
                <>
                    <h1 className=" text-3xl text-center w-full border-b border-gray-700 font-semibold text-white mt-10 pb-4">Spended</h1>
                    <div className="bg-black p-6 rounded-lg text-white w-full mt-8">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={spendingByService} barSize={350}>
                                <XAxis dataKey="name" stroke="white" />
                                <YAxis stroke="white" />
                                <Tooltip />
                                <Bar dataKey="amount" fill="#ff000052" />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="mt-4 text-sm text-gray-400">Based on all paid subscriptions on each service.</p>
                    </div>
                </>

            )
        }

    } else {
        return null;
    }


}

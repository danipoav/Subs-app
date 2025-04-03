import { useSelector } from "react-redux";
import { RootState } from "../features/store"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function GraphicComponent() {

    const payments = useSelector((state: RootState) => state.payment.payments);
    const subscriptions = useSelector((state: RootState) => state.subscription.subscriptions);
    const userSubs = subscriptions.map(sub => sub.id);
    const userPayments = payments.filter(p => userSubs.includes(p.subscribe.id));
    console.log(userPayments)

    const isThisMonth = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        return (
            date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
        )
    }

    const totalSpent = userPayments
        .filter(p => p.state === "Pagado" && isThisMonth(p.paymentDate))
        .reduce((acc, p) => acc + p.amount, 0)

    const data = [{ name: 'This month', amount: totalSpent }]

    return (
        <>
            <h1 className=" text-3xl text-center w-full border-b border-gray-700 font-semibold text-white mt-10 pb-4">Spending</h1>
            <div className="bg-black p-6 rounded-lg text-white w-full mt-8">
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#38bdf8" />
                    </BarChart>
                </ResponsiveContainer>
                <p className="mt-4 text-sm text-gray-400">Based on all paid subscriptions this month.</p>
            </div>
        </>

    )
}

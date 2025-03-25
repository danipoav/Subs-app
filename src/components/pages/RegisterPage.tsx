import { useNavigate } from "react-router-dom";
import { getLoginToken } from "../../features/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../features/store";
import { PiSubsetProperOfFill } from "react-icons/pi";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { error, status, token } = useSelector((state: RootState) => state.auth);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(getLoginToken({ email, password }));
    };

    useEffect(() => {
        if (status === 'authenticated' && token) {
            navigate('/');
        }
    }, [status, navigate, token])

    return (
        <div className=" min-h-screen flex items-center justify-center px-4" style={{ background: "#08090a" }}>

            <div className=" p-8 rounded-xl shadow-xl w-full max-w-md">
                <div className=" flex justify-center align-middle pb-2">
                    <PiSubsetProperOfFill size={50} color="white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Register to Sub-Lin</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className=" text-center">
                            <span className=" text-red-600">Incorrect credentials</span>
                        </div>
                    )}
                    <div>
                        <input type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            style={{ background: "rgb(30, 32, 37)", border: "1px solid rgb(44, 46, 51)" }}
                            required
                        />
                    </div>
                    <div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            style={{ background: "rgb(30, 32, 37)", border: "1px solid rgb(44, 46, 51)" }}
                            required
                        />
                    </div>
                    <div>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            style={{ background: "rgb(30, 32, 37)", border: "1px solid rgb(44, 46, 51)" }}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition duration-200 cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-gray-500 mt-6 text-center cursor-pointer">
                    Already have an account?{" "}
                    <a onClick={()=> navigate('/login')} className="text-white underline hover:text-gray-300">
                        Log in here
                    </a>
                </p>
            </div>
        </div>
    );
}

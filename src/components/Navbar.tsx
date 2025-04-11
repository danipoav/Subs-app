import { PiSubsetProperOfFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../features/store";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

interface NavbarProps {
    servicesRef: React.RefObject<HTMLDivElement | null>;
}

export default function Navbar({ servicesRef }: NavbarProps) {
    const navigate = useNavigate();
    const { token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogOut = () => {
        dispatch(logout());
        window.location.reload();
        toast.success('Godbye!')
    }

    const handleBeginning = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleServices = () => {
        servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleSubs = () => {
        window.scrollTo({
            top: 1280,
            behavior: 'smooth'
        })
    }

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-700 " style={{ color: "#f7f8f8" }}>
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
                    <div onClick={handleBeginning} className=" text-xl font-bold text-white flex cursor-pointer"><PiSubsetProperOfFill size={30} />Sub-Lin</div>
                    <div className=" md:flex space-x-5">
                        <a onClick={handleServices} className="text-gray-300 hover:text-white transition cursor-pointer rounded-lg py-1 px-2 hover:bg-gray-900">Services</a>
                        <a onClick={handleSubs} className="text-gray-300 hover:text-white transition cursor-pointer rounded-lg py-1 px-2 hover:bg-gray-900">Subscriptions</a>
                        <a href="#contact" className="text-gray-300 hover:text-white transition cursor-pointer rounded-lg py-1 px-2 hover:bg-gray-900">Contact</a>
                    </div>
                    <div>
                        {token ?
                            (<button className="flex justify-center align-middle cursor-pointer text-gray-300 hover:text-white" onClick={handleLogOut}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="48" strokeDashoffset="48" d="M16 5v-1c0 -0.55 -0.45 -1 -1 -1h-9c-0.55 0 -1 0.45 -1 1v16c0 0.55 0.45 1 1 1h9c0.55 0 1 -0.45 1 -1v-1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0" /></path><path strokeDasharray="12" strokeDashoffset="12" d="M10 12h11"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="12;0" /></path><path strokeDasharray="6" strokeDashoffset="6" d="M21 12l-3.5 -3.5M21 12l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="6;0" /></path></g></svg>
                            </button>) : (
                                <>
                                    <button onClick={() => navigate('/login')} className=" text-gray-300 px-4 py-2 rounded-md hover:bg-gray-900 transition mr-2 hover:text-white cursor-pointer">
                                        Login
                                    </button>
                                    <button onClick={() => navigate('/register')} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-white transition cursor-pointer">
                                        Sign up
                                    </button></>
                            )}


                    </div>
                </div>
            </nav>
        </>
    )
}

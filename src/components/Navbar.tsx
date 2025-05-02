import { PiSubsetProperOfFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../features/store";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

interface NavbarProps {
    servicesRef: React.RefObject<HTMLDivElement | null>;
    manageRef: React.RefObject<HTMLDivElement | null>;
    subsRef: React.RefObject<HTMLDivElement | null>;
}

export default function Navbar({ servicesRef, manageRef, subsRef }: NavbarProps) {
    const navigate = useNavigate();
    const { status } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const [menuOpen, setMenuOpen] = useState(false);

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
        subsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const manageScroll = () => {
        manageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
             <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-700 text-white">
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
                <div onClick={handleBeginning} className="text-xl font-bold flex cursor-pointer">
                    <PiSubsetProperOfFill size={30} />Sub-Lin
                </div>

                {/* Botón de menú móvil */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
                        {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                    </button>
                </div>

                {/* Principal Menu */}
                <div className="hidden md:flex space-x-5">
                    <a onClick={handleServices} className="hover:text-white transition cursor-pointer rounded-lg py-1 px-2 hover:bg-gray-900">Services</a>
                    {status === 'authenticated' && (
                        <a onClick={handleSubs} className="hover:text-white transition cursor-pointer rounded-lg py-1 px-2 hover:bg-gray-900">Subscriptions</a>
                    )}
                    <a onClick={manageScroll} className="hover:text-white transition cursor-pointer rounded-lg py-1 px-2 hover:bg-gray-900">Management</a>
                </div>

                {/* login/logout Buttons */}
                <div className="hidden md:block">
                    {status === 'authenticated' ? (
                        <button onClick={handleLogOut} className="text-gray-300 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path strokeDasharray="48" strokeDashoffset="48" d="M16 5v-1c0 -0.55 -0.45 -1 -1 -1h-9c-0.55 0 -1 0.45 -1 1v16c0 0.55 0.45 1 1 1h9c0.55 0 1 -0.45 1 -1v-1">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0" />
                                    </path>
                                    <path strokeDasharray="12" strokeDashoffset="12" d="M10 12h11">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="12;0" />
                                    </path>
                                    <path strokeDasharray="6" strokeDashoffset="6" d="M21 12l-3.5 -3.5M21 12l-3.5 3.5">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="6;0" />
                                    </path>
                                </g>
                            </svg>
                        </button>
                    ) : (
                        <>
                            <button onClick={() => navigate('/login')} className="text-gray-300 px-4 py-2 rounded-md hover:bg-gray-900 transition mr-2 hover:text-white cursor-pointer">Login</button>
                            <button onClick={() => navigate('/register')} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-white transition cursor-pointer">Sign up</button>
                        </>
                    )}
                </div>
            </div>

            {/* Menú móvil */}
            {menuOpen && (
                <div className="md:hidden px-6 pb-4 space-y-3 flex flex-col">
                    <a onClick={handleServices} className="hover:text-white transition cursor-pointer">Services</a>
                    {status === 'authenticated' && (
                        <a onClick={handleSubs} className="hover:text-white transition cursor-pointer">Subscriptions</a>
                    )}
                    <a onClick={manageScroll} className="hover:text-white transition cursor-pointer">Management</a>
                    {status === 'authenticated' ? (
                        <button onClick={handleLogOut} className="text-left text-gray-300 hover:text-white">Logout</button>
                    ) : (
                        <>
                            <button onClick={() => { navigate('/login'); setMenuOpen(false); }} className="text-left text-gray-300 hover:text-white">Login</button>
                            <button onClick={() => { navigate('/register'); setMenuOpen(false); }} className="text-left text-gray-300 hover:text-white">Sign up</button>
                        </>
                    )}
                </div>
            )}
        </nav>
        </>
    )
}

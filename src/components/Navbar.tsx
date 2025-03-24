import { PiSubsetProperOfFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate('/login');
    }

    return (
        <>
            <nav className=" fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-700" style={{ color: "#f7f8f8" }}>
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
                    <div className=" text-xl font-bold text-white flex"><PiSubsetProperOfFill size={30} />Sub-Lin</div>
                    <div className=" md:flex space-x-10">
                        <a href="#services" className="text-gray-300 hover:text-white transition cursor-pointer">Services</a>
                        <a href="#subscriptions" className="text-gray-300 hover:text-white transition">Subscriptions</a>
                        <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
                    </div>
                    <div>
                        <button onClick={handleClickLogin} className=" text-gray-300 px-4 py-2 rounded-md hover:bg-gray-900 transition mr-2 hover:text-white cursor-pointer">
                            Login
                        </button>
                        <button className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-white transition cursor-pointer">
                            Sign up
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

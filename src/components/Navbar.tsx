import { PiSubsetProperOfFill } from "react-icons/pi";


export default function Navbar() {
    return (
        <>
            <nav className=" fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-50">
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
                    <div className=" text-xl font-bold text-white flex"><PiSubsetProperOfFill size={31} />Sysm</div>
                    <div className="hidden md:flex space-x-10">
                        <a href="#services" className="text-gray-300 hover:text-white transition">Services</a>
                        <a href="#subscriptions" className="text-gray-300 hover:text-white transition">Subscriptions</a>
                        <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
                    </div>
                    <div>
                        <button className=" text-gray-300 px-4 py-2 rounded-md hover:bg-gray-900 transition mr-2 hover:text-white">
                            Login
                        </button>
                        <button className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-white transition">
                            Sign up
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

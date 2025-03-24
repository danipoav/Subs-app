import { useState } from "react";
import { PiSubsetProperOfFill } from "react-icons/pi";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí llamarías a tu thunk loginUser({ email, password })
    console.log("Login with:", email, password);
  };

  return (
    <div className=" min-h-screen flex items-center justify-center px-4" style={{ background: "#08090a" }}>

      <div className=" p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className=" flex justify-center align-middle pb-2">
        <PiSubsetProperOfFill size={50} color="white"/>
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Log in to Sub-Lin</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
              style={{background:"rgb(30, 32, 37)",border:"1px solid rgb(44, 46, 51)"}}
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
              style={{background:"rgb(30, 32, 37)",border:"1px solid rgb(44, 46, 51)"}}
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

        <p className="text-sm text-gray-500 mt-6 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-white underline hover:text-gray-300">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

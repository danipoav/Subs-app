import { useEffect, useState } from "react";
import { PiSubsetProperOfFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../features/store";
import { getLoginToken } from "../features/auth/authThunk";
import { resetAuthState } from "../features/auth/authSlice";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error, status, token } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state: RootState) => state.auth.loading);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(getLoginToken({ email, password }));
  };

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch])

  useEffect(() => {
    if (status === 'authenticated' && token) {
      navigate('/');
    }
  }, [status, navigate, token])

  const togglePassword = () => {
    setShowPassword((prev) => (!prev))
  }

  return (
    <div className=" min-h-screen flex items-center justify-center px-4" style={{ background: "#08090a" }}>
      {loading ?
        <svg className="svgLoad" viewBox="25 25 50 50">
          <circle className="circleLoad" r="20" cy="50" cx="50"></circle>
        </svg> :
        <div className=" p-8 rounded-xl shadow-xl w-full max-w-md">
          <div className=" flex justify-center align-middle pb-2">
            <PiSubsetProperOfFill size={50} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Log in to Sub-Lin</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className=" text-center">
                <span className=" text-red-600">Incorrect credentials</span>
              </div>
            )}
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
            <div className=" relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                style={{ background: "rgb(30, 32, 37)", border: "1px solid rgb(44, 46, 51)" }}
                required
              />
              <button type="button" className=" text-white absolute right-3 top-2 cursor-pointer p-1 border border-white rounded-lg" onClick={togglePassword}>
                {showPassword ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M3 13c3.6-8 14.4-8 18 0" /><path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6" /></g></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.5c-3.8 0-7.2-2.1-8.8-5.5H1c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5" /></svg>

                }
              </button>
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
        </div>}

    </div>
  );
}

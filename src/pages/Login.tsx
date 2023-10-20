import { useState, MouseEvent } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { auth, provider } from "../firebase/Firebase";
import { signInWithPopup } from "firebase/auth";
import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import cartImage from "../assets/cart.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const { isFetching, error } = useAppSelector((state) => state.user);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const email = result.user.email;
        if (email) {
          localStorage.setItem("email", email);
        } else {
          console.log("Error signing in with Google");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
      <div className="flex justify-center items-center h-2/3 bg-slate-400">
        <div className="relative w-3/5 h-full hidden md:flex flex-col">
          <img
            className="w-full h-full object-cover"
            src={cartImage}
            alt="cart"
          />
        </div>
        <div className="w-full md:w-2/5 h-full bg-slate-200 flex flex-col p-8 justify-between">
          <h1 className="text-2xl text-[#614623] font-semibold font-display">
            eShopper e-commerce app
          </h1>
          <div className="w-full flex flex-col">
            <input
              className="w-full border-b border-[#614623] bg-transparent py-2 my-2 outline-none focus:outline-none"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-[#614623] bg-transparent py-2 my-2 outline-none focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              disabled={isFetching}
              className="w-full bg-[#614623] text-white rounded-lg p-1 my-3"
            >
              Log In
            </button>
            <div>
              <div>
                <p>or</p>
              </div>
              <button
                onClick={signInWithGoogle}
                className="flex items-center justify-center w-full bg-white text-[#255f23] rounded-lg p-1 my-3 border-[1px] border-[#255f23] "
              >
                Sign In with Google
              </button>
            </div>
            <p>No account? Sign up for free.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

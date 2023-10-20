import { useState, MouseEvent, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import cartImage from "../assets/cart.jpg";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { isFetching, error } = useAppSelector((state) => state.user);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputs.email !== "" && inputs.password !== "") {
      createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
        .then(() => {
          console.log("Congrats!, you can now Sign In");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div className="flex justify-center items-center h-2/3 bg-slate-300">
        <div className="w-full md:w-2/5 h-full bg-slate-100 flex flex-col p-8 justify-between">
          <h1 className="text-2xl text-[#614623] font-semibold font-display">
            eShopper e-commerce app
          </h1>
          <div className="w-full flex flex-col">
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border-b border-[#614623] bg-transparent py-2 my-2 outline-none focus:outline-none"
            />
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border-b border-[#614623] bg-transparent py-2 my-2 outline-none focus:outline-none"
            />
            {error && <p className="text-red-700">Register failure</p>}
            <button
              onClick={handleSubmit}
              disabled={isFetching}
              className="w-full bg-[#614623] text-white rounded-lg p-1 my-3"
            >
              Register
            </button>
          </div>
          <div className="flex justify-around">
            <p className="text-sm font-semibold text-[#614623]">
              Have an account already?
            </p>
            <Link to="/login" className="text-brown-700">
              <button className="text-base rounded-lg p-1 my-3 bg-white font-semibold text-[#273575] border-[1px] border-[#0a444e]">
                Sign in
              </button>
            </Link>
          </div>
        </div>
        <div className="relative w-3/5 h-full hidden md:flex flex-col ">
          <img src={cartImage} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Register;

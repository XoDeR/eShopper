import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase/Firebase";
import { signInWithPopup } from "firebase/auth";
import cartImage from "../assets/cart.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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
    <div>
      <div>
        <div>
          <img src={cartImage} alt="cart" />
        </div>
        <div>
          <h1>eShopper e-commerce app</h1>
        </div>
        <div>
          <input type="text" />
          <input type="text" />
          <button>Log In</button>
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
  );
};

export default Login;

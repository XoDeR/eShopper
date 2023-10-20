import React from "react";

import { auth, provider } from "../firebase/Firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const email = result.user.email;
        if (email) {
          localStorage.setItem("email", email);
        } else {
          console.log("Error signing in");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        onClick={signInWithGoogle}
        className="flex items-center justify-center w-full bg-white text-[#255f23] rounded-lg p-1 my-3 border-[1px] border-[#255f23] "
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default Login;

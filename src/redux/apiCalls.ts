import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import type { AppDispatch } from "../redux/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Firebase";

export const login = async (
  dispatch: AppDispatch,
  { email: email, password: password }: { email: string; password: string }
) => {
  dispatch(loginStart());
  try {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(loginSuccess(user.uid));
        console.log("Login user id: ", user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        errorCode === "auth/user-not-found!"
          ? console.log("Email is not registered!")
          : console.log("Invalid password");
        dispatch(loginFailure());
      });
  } catch (err) {
    dispatch(loginFailure());
  }
};

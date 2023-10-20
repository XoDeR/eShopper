import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdG3tWnJlUxS4eITFK4gQM24Sg5vUi93Q",
  authDomain: "e-shopper-r-ts.firebaseapp.com",
  projectId: "e-shopper-r-ts",
  storageBucket: "e-shopper-r-ts.appspot.com",
  messagingSenderId: "997786352224",
  appId: "1:997786352224:web:6f4b37c795323bf765e105",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;

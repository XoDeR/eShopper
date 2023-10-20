import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";
import { RootState } from "./redux/store";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  const userId = useAppSelector((state: RootState) => state.user.currentUserId);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            userId !== "" ? <Home /> : <Navigate to="/login" replace={true} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            userId !== "" ? <Navigate to="/" replace={true} /> : <Login />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

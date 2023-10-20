import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const userId = useSelector((state: RootState) => state.user.currentUserId);
  return (
    <div>
      <Routes>
        <Route path="/" element={userId !== "" ? <Home /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;

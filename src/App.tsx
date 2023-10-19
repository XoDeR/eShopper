import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import "./App.css";

function App() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <div>Home</div> : <div>Login</div>} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecipePage from "./pages/RecipePage";
import BottomNavBar from "./components/bottom/BottomNavBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipe" element={<RecipePage />} />
      </Routes>
      <BottomNavBar />
    </>
  );
}

export default App;

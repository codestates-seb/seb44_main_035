import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import MyPage from "./pages/MyPage";
import MyWritePage from "./pages/MyWritePage";
import Login from "./pages/Login";
import RecipePage from "./pages/RecipePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import BottomNavBar from "./components/bottom/BottomNavBar";
import SearchPage from "./pages/SearchPage";
import { RecipeProps } from "./components/detail/RecipeDetail";
import { useState } from "react";
import BasketPage from "./pages/BasketPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

interface Props {
  // data: RecipeProps[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  state: string;
}
function App() {
  const [data, setData] = useState([]);

  function isLoggedIn() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log("isLoggedIn:", isLoggedIn);
    return isLoggedIn;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <MainPage /> : <LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/create-recipe" element={<WritePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/my-writepage" element={<MyWritePage />} />
        <Route path="/create-recipe/:id" element={<EditPage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipes/:id" element={<DetailPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/recipes/search/:keyword" element={<SearchPage />} />
      </Routes>

      {/* <BottomNavBar /> */}
    </>
  );
}

export default App;

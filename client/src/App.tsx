import { Routes, Route } from "react-router-dom";

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

interface Props {
  // data: RecipeProps[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  state: string;
}
function App() {
  const [data, setData] = useState([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-recipe" element={<WritePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/my-writepage" element={<MyWritePage />} />
        <Route path="/create-recipe/:id" element={<EditPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipes/:id" element={<DetailPage />} />
        <Route
          path="/recipes/search/:keyword"
          // path="/recipes/search/:keyword"
          element={<SearchPage />}
        />
      </Routes>
      {/* <BottomNavBar /> */}
    </>
  );
}

export default App;

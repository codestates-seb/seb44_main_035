import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecipePage from "./pages/RecipePage";
import DetailPage from "./pages/DetailPage";
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
        <Route path="/" element={<></>} />
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

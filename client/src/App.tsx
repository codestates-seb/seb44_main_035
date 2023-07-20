import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RecipePage from "./pages/RecipePage";
import DetailPage from "./pages/DetailPage";
import BottomNavBar from "./components/bottom/BottomNavBar";
import SearchPage from "./pages/SearchPage";
import { RecipeProps } from "./components/detail/RecipeDetail";
import { useState } from "react";
import MainPage from "./pages/MainPage";
import BaseketPage from "./pages/BaseketPage";

export interface Recipes {
  recipe_id: number;
  name: string;
  view: number;
  likes: number;
  img: string;
}

export interface RecipeList {
  recipes: Recipes;
}

export interface RecipeList {
  Recipes: {
    recipe_id: number;
    name: string;
    view: number;
    likes: number;
    img: string;
  };
}

function App() {
  const [data] = useState<RecipeList[]>([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipes/:recipeId" element={<DetailPage />} />
        <Route
          path="/recipes/search/:keyword"
          // path="/recipes/search/:keyword"
          element={<SearchPage />}
        />
        <Route path="*" element={<div>없는 페이지입니다.</div>} />
      </Routes>
      {/* <BottomNavBar /> */}
    </>
  );
}

export default App;

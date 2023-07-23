import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import MyPage from "./pages/MyPage";
import MyWritePage from "./pages/MyWritePage";
import EditPage from "./pages/EditPage";
import Login from "./pages/Login";
import RecipePage from "./pages/RecipePage";
import DetailPage from "./pages/DetailPage";
import BottomNavBar from "./components/bottom/BottomNavBar";
import SearchPage from "./pages/SearchPage";
import { useState } from "react";
import Basket from "../src/pages/BaseketPage";
import Refridge from "../src/pages/RefridgePage";

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
        <Route path="/refridge" element={<Refridge />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/create-recipe" element={<WritePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/my-recipe" element={<MyWritePage />} />
        <Route path="/create-recipe/:id" element={<EditPage />} />
        <Route path="*" element={<div>없는 페이지입니다.</div>} />
      </Routes>
      {/* <BottomNavBar /> */}
    </>
  );
}

export default App;

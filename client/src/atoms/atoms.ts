import { atom } from "recoil";
import { Recipes } from "../types/types";

/* ----- 재료 아이템의 상태 -----  */
export const ingreItemAtom = atom<string[]>({
  key: "ingreItemAtom",
  default: [],
});
/* ----- 레시피 상태 -----  */
export const recipesStateAtom = atom<Recipes>({
  key: "recipesStateAtom",
  default: {
    recipeName: "",
    recipeImage: "",
    recipeIntro: "",
    ingredients: [],
    cookStepContent: [],
    cookStepImage: [],
  },
});

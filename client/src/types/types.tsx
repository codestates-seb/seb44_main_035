export interface IngredientType {
  ingredientName: string;
  quantity: string;
}

export interface Recipes {
  recipeName: string;
  recipeImage: File;
  recipeIntro: string;
  ingredients: IngredientType[];
  cookStepContent: string[];
  cookStepImage: File[];
}
export interface updateRecipe {
  recipeName: string;
  recipeImage: string;
  recipeIntro: string;
  ingredients: IngredientType[];
  cookStepContent: string[];
  cookStepImage: string[];
}

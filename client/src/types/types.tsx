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

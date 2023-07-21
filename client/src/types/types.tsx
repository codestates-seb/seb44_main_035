export interface Ingredient {
  ingredientName: string;
  quantity: string;
}

export interface Recipes {
  recipeName: string;
  recipeImage: string;
  recipeIntro: string;
  ingredients: Ingredient[];
  cookStepContent: string[];
  cookStepImage: string[];
}

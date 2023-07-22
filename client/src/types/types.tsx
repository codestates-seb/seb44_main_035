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

export interface Comments {
  recipeId: number;
  userId: number;
  commentId: number;
  commentContent: string;
  createdAt: string;
  modifiedAt: string;
}

export interface CommentsPost {
  commentContent: string;
}

export interface CommentsEdit {
  commentId: number;
  commentContent: string;
}

export interface Ingredients {
  ingredientId: number;
  ingredientName: string;
  quantity: string;
}

export interface RecipeDetail {
  recipeId: number;
  recipeName: string;
  recipeImage: string;
  recipeIntro: string;
  cookStepContent: [];
  cookStepImage: string;
  comments: Comments[];
  ingredients: Ingredients[];
}

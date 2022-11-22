import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initiaState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initiaState,action: ShoppingListActions.AddIngredient){
  switch (action.type){
    case ShoppingListActions.ADD_INGREDIENT:
    return {
      ...state,
      ingredient: [...state.ingredients, action.payload]
    };
    default:
      return state;
  }
}

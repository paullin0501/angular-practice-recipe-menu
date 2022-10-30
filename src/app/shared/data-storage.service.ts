import { RecipeService } from "./../recipes/recipe.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        "https://ng-course-recipe-book-276d8-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json",
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  //fetch data 基本上用方式
  // fetchRecipes(){
  //     this.http.get<Recipe[]>('https://ng-course-recipe-book-276d8-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
  //     .pipe(map(recipes =>{
  //       return recipes.map(recipe => {
  //         return { ...recipe, ingredients:recipe.ingredients ? recipe.ingredients: []
  //         };
  //       });
  //     })
  //     )
  //     .subscribe(recipes=>{
  //       this.recipeService.setRecipes(recipes)
  //     });
  // }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        "https://ng-course-recipe-book-276d8-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}

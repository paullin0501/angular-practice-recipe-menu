import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Component, OnInit, EventEmitter,Output } from '@angular/core';

import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
//  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription:Subscription;
  constructor(private recipeService:RecipeService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
   this.subscription =  this.recipeService.recipesChanged
      .subscribe(
        (recipes:Recipe[]) => {
        this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
  }
  // onRecipeSelecred(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}

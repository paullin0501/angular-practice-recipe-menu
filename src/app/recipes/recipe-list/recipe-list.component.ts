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

  constructor(private recipeService:RecipeService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }
  // onRecipeSelecred(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }

}

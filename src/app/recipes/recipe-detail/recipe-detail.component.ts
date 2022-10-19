import { RecipeService } from "./../recipe.service";
import { Recipe } from "./../recipe.model";
import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe:Recipe;
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    //使用subcribe是因為不只第一次進入這個頁面需要id
    this.route.params
    .subscribe(
      (params:Params)=>{
        //+將字串轉成number
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )

  }
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
}

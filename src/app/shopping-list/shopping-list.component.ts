import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10),
  // ];
  ingredients: Observable<{ingredients:Ingredient[]}>;
  private igChangeSub: Subscription;

  constructor(private slService: ShoppingListService,
              private store: Store <{shoppingList: {ingredients: Ingredient[] } }>) { }

  ngOnInit() {
   this.ingredients = this.store.select('shoppingList');
  //   this.ingredients = this.slService.getIngredients();
  //  this.igChangeSub = this.slService.ingredientsChanged
  //   .subscribe(
  //     (ingredients:Ingredient[])=>{
  //       this.ingredients = ingredients;
  //     }
  //   )
  }
  ngOnDestroy(): void {
 // this.igChangeSub.unsubscribe();

  }

 onEditItem(index: number){
  this.slService.startedEditting.next(index);
 }

  // onIngredientAdded(ingredient:Ingredient){
  //   this.ingredients.push(ingredient);
  // }

}

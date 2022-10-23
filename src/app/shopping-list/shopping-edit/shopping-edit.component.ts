import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit ,ViewChild,ElementRef,EventEmitter,Output} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription:Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  // @ViewChild('nameInput',{static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput',{static: false}) amountInputRef: ElementRef;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditting
      .subscribe(
        (index: number) =>{
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }


  onSubmit(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName,ingAmount);
    // console.log(ingName,ingAmount);
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);

    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    } else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset()

  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
    }

    onDelete(){
      this.slService.deleteIngredient(this.editedItemIndex);
      this.onClear();

    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

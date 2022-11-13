import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent  implements OnInit,OnDestroy{
//  @Output()  featureSelected = new EventEmitter<string>();
  // 改用router來連結頁面
  // onSelect(feature:string){
  //   this.featureSelected.emit(feature);
  // }
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private dataStorageService:DataStorageService,private authService: AuthService){}

  ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user =>{
        this.isAuthenticated = !!user   // = !user ? false : true;
      });
  }
  onLogout(){
    this.authService.logout();
  }
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

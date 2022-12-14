import { CoreModule } from './core.module';
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from '@ngrx/store'
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';


@NgModule({
  declarations: [AppComponent, HeaderComponent,],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
    CoreModule
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

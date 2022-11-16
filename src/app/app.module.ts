import { CoreModule } from './core.module';
import { SharedModule } from "./shared/shared.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RecipesModule } from "./recipes/recipes.module";
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent,],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

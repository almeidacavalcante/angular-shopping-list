import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { ShoppingModule } from './views/shopping/shopping.module';
import { ItemService } from './services/item/item.service';
import { NgElseDirective } from "./shared/ng-else.directive";



@NgModule({
  imports: [
    BrowserModule,
    ShoppingModule,
    FormsModule
  ], 
  declarations: [
    AppComponent
  ],
  providers: [
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

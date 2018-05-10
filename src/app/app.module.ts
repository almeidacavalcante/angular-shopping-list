import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { InsertItemComponent } from './views/insert-item/insert-item.component';
import { ListItemsComponent } from './views/list-items/list-items.component';
import { ShoppingController } from './controllers/shopping-controller';
import { ItemService } from './services/item/item.service';

@NgModule({
  declarations: [
    AppComponent,
    InsertItemComponent,
    ListItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ItemService,
    ShoppingController
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  private controller : ShoppingController;

  constructor() {
    this.controller = new ShoppingController();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertItemComponent } from './insert-item/insert-item.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ShoppingViewComponent } from './shopping-view/shopping-view.component';
import { FormsModule } from '@angular/forms';
import { PriceComponent } from './price/price.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InsertItemComponent,
    ListItemsComponent,
    ShoppingViewComponent
  ],
  declarations: [
    InsertItemComponent,
    ListItemsComponent,
    ShoppingViewComponent,
    PriceComponent]
})
export class ShoppingModule {}
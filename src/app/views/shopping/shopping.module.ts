import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertItemComponent } from './insert-item/insert-item.component';
import { ListItemsComponent } from './list-items/list-items.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InsertItemComponent,
    ListItemsComponent]
})
export class ShoppingModule { }

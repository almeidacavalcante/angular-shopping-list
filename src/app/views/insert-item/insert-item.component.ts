import { Component, OnInit, Input } from '@angular/core';
import { ListItemsComponent } from '../list-items/list-items.component';
import { ShoppingController } from '../../controllers/shopping-controller';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.component.html',
  styleUrls: ['./insert-item.component.css']
})

export class InsertItemComponent {

  @Input() itemName: string;

  private controller: ShoppingController;


  constructor(){
    this.controller = new ShoppingController();

  }

  private insertItem() {
    if (this.itemName != undefined) {

      let item = new Item(this.itemName, new Date());

      this.controller.insertItem(item);
    }
  }
}
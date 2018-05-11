import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ListItemsComponent } from '../list-items/list-items.component';
import { ShoppingController } from '../../../controllers/shopping-controller';
import { Item } from '../../../models/Item';
import { ItemService } from '../../../services/item/item.service';


@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.component.html',
  styleUrls: ['./insert-item.component.css']
})

export class InsertItemComponent {

  @Input() itemName: string;



  constructor(private service: ItemService){

  }

  private insertItem() {
    if (this.itemName != undefined) {

      let item = new Item(this.itemName, new Date());

      this.service.insertItem(item);
    }
  }
}
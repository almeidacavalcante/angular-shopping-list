import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as $ from "../../../../../node_modules/jquery";

import { ListItemsComponent } from '../list-items/list-items.component';
import { Item, Unit } from '../../../models/Item';
import { ItemService } from '../../../services/item/item.service';



@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.component.html',
  styleUrls: ['./insert-item.component.css']
})

export class InsertItemComponent {

  private itemName: string = '';
  public unit: Unit = Unit.Kg;
  
  constructor(private service: ItemService){}

  private insertItem() {
    if (this.itemName != '') {

      let item = new Item(this.itemName, new Date(), this.unit);

      this.service.insertItem(item);
      this.itemName = '';
    }
  }

  selected = true;

  /**
   * toggle
   */
  public toggle(event: Event) {
    console.log(event.target);
    (<Element>event.target).setAttribute('checked', '');
    console.log((<Element>event.target).parentElement.parentElement);
    $(event.target).button('toggle')
    
    

    
  }
}
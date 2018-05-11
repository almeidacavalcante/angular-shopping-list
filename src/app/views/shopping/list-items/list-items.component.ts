import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item/item.service';
import { Item } from '../../../models/Item';
import { ShoppingController } from '../../../controllers/shopping-controller';


@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent {

  private items : Item[];

  constructor(private service: ItemService) { 

  }

  ngOnInit() {
    this.service.listUpdater.subscribe(
      (lang) => {
        this.items = this.service.items;
      }
    );
  }

  /**
   * update
   */
  public update(items: Item[]) {
    this.items = this.service.items;
  }

  /**
   * delete
   */
  public delete(item: Item,event: Event) {
    if (event.srcElement.nodeName == 'BUTTON') this.service.delete(item);
  }
}

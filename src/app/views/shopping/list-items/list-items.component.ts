import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item/item.service';
import { Item } from '../../../models/Item';
import { ShoppingController } from '../../../controllers/shopping-controller';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import * as $ from 'jquery';


@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent {

  private items : Item[];

  constructor(private service: ItemService) { 

  }

  /**
   * showModal
   */
  public showModal() {
    debugger
    $('#exampleModal').modal('show')
  }

  ngOnInit() {
    this.service.listUpdater.subscribe(
      (lang) => {
        this.items = this.service.items;
      }
    );
  }

  /**
   * showItemPopup
   */
  public showItemPopup() {
    this.service.show.next(true);
  }

  /**
   * update
   */
  public update(items: Item[]) {
    this.items = this.service.items;
  }

  /**
   * takeAction
   */
  public takeAction(item: Item, event: Event) {
    if (event.srcElement.getAttribute('id') == Action.purchase){
      this.service.purchase(item);
      let button = event.srcElement;
      this.showItemPopup(); 
      
      
    }else if (event.srcElement.getAttribute('id') == Action.delete){
      this.service.delete(item);
    }
  }
}

enum Action {
  purchase = 'purchase',
  delete = 'delete'
}

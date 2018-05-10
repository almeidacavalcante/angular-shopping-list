import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from './item.service';
import { ListItemsComponent } from '../list-items/list-items.component';


@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.component.html',
  styleUrls: ['./insert-item.component.css']
})

export class InsertItemComponent {

  @Input() itemName: string;

  private service: ItemService;
  private listItemsComponent: ListItemsComponent;

  constructor(){
    this.service = new ItemService();
    this.listItemsComponent = new ListItemsComponent();
  }

  private insertItem() {
    if (this.itemName != '') {
      this.service.insertItem(this.itemName, () => {
        this.listItemsComponent.update();
      });
    }
  }



}

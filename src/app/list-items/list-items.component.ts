import { Component, OnInit } from '@angular/core';
import { ItemService } from '../insert-item/item.service';


@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  private service : ItemService;
  private items: string[];


  constructor() { 
    this.service = new ItemService();
  }

  ngOnInit() {
    this.items = this.getItems();
  }

  /**
   * getItems
   */
  public getItems() : string[]{
    return ['Rice', 'Sugar', 'Onion', 'Salt', 'Garlic'];
  }

  /**
   * update
   */
  public update() {
    this.items.push('Maca');
  }


}

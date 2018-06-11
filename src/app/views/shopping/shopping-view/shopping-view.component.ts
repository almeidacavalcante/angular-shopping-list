import { Component, OnInit } from '@angular/core';
import { ShoppingList } from '../../../models/ShoppingList';
import { ItemService } from '../../../services/item.service';


@Component({
  selector: 'app-shopping-view',
  templateUrl: './shopping-view.component.html',
  styleUrls: ['./shopping-view.component.css']
})
export class ShoppingViewComponent implements OnInit {

  public isFinished: boolean = true;

  constructor(private service: ItemService) {

  }

  ngOnInit() {
    
  }

  /**
   * save
   */
  public save() {
    if (this.isFinished) {
      this.service.saveShoppingList();
      this.service.clearShoppingList();
    }else{
      throw new Error('You cannot save a shoppingList while is there any unpurchased items');
    }
  }
}

import { Injectable, EventEmitter } from "@angular/core";
import { Item } from "../../models/Item";
import { ListItemsComponent } from "../../views/shopping/list-items/list-items.component";
import { Subject, Observable } from "rxjs";
import { PriceComponent } from "../../views/shopping/price/price.component";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  private _items: Item[];
  public listUpdater: EventEmitter<ListItemsComponent> = new EventEmitter();
  public purchaseEvent: EventEmitter<PriceComponent> = new EventEmitter();


  constructor() {
    this._items = new Array<Item>();
  }

  public insertItem(item: Item): void {
    this._items.push(item);
    this.listUpdater.emit();
  }

  
  public get items() : Item[] {
    return this._items
  }
  
  /**
   * delete
   */
  public delete(item: Item) {
     this._items.splice(this.items.indexOf(item), 1);
  }

  /**
   * purchase
   */
  public purchase(item: Item) {
    item.purchase();
    this.purchaseEvent.emit();    
    console.log('after emit()');
    
  }
}
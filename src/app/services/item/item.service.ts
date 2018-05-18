import { Injectable, EventEmitter } from "@angular/core";
import { Item, State } from "../../models/Item";
import { ListItemsComponent } from "../../views/shopping/list-items/list-items.component";
import { Subject, Observable } from "rxjs";
import { PriceComponent } from "../../views/shopping/price/price.component";
import { ShoppingList } from "../../models/ShoppingList";
import { ItemDaoService } from "../item-dao/item-dao.service";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private _shoppingList: ShoppingList;
  obsItems: Observable<any[]>;
  static listUpdater: EventEmitter<ListItemsComponent> = new EventEmitter();
  public purchaseEvent: EventEmitter<PriceComponent> = new EventEmitter();


  constructor(private dao: ItemDaoService) {
    this._shoppingList = new ShoppingList()
    this.dao.log();
  }

  public insertItem(item: Item): void {
    this._shoppingList.add(item);
    ItemService.listUpdater.emit();
  }

  /**
   * sortItems
   */
  public sortItems() {
    this._shoppingList.items.sort((item) => {
      if(item.state == State.Purchased){
        return 1;
      }
    })
  }

  public get items() : Array<Item> {
    return this._shoppingList.items;
  }

  /**
   * onCheck
   * TODO: Change this ineficient routine
   */
  public onCheck() {
    let isFinished = true;
    this._shoppingList.items.forEach( (item) => {
      if (item.state == State.Listed){
        isFinished = false;
      }
    })
    if (isFinished){
      this._shoppingList.isFinished = true;
    }
  }
  
  /**
   * delete
   */
  public delete(item: Item) {
    let list = this._shoppingList;
    list.items.splice(list.items.indexOf(item), 1);
    this._shoppingList = list;
  }

  /**
   * addShoppingList
   */
  public addShoppingList(shoppingList: ShoppingList) {
    this._shoppingList = shoppingList;
  }

  /**
   * persistShoppingList
   */
  public persistShoppingList() {
    this.dao.save(this._shoppingList)
  }
}
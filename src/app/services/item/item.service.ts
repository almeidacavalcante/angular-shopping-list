import { Injectable, EventEmitter } from "@angular/core";
import { Item } from "../../models/Item";
import { ListItemsComponent } from "../../views/shopping/list-items/list-items.component";
import { Subject, Observable, Subscription } from "rxjs";
import { PriceComponent } from "../../views/shopping/price/price.component";
import { ShoppingList } from "../../models/ShoppingList";
import { ItemDaoService, ItemInterface } from "../item-dao/item-dao.service";
import { AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class ItemService { 

  private _shoppingList = new ShoppingList();
  private _storedItems : Array<Item>;

  subscription: Subscription;

  private itemsPromise: Promise<Item[]>

  static listUpdater: EventEmitter<ListItemsComponent> = new EventEmitter();
  public purchaseEvent: EventEmitter<PriceComponent> = new EventEmitter();

  constructor(private dao: ItemDaoService) {
    this.itemsPromise = this.dao.getAll();    
    this.itemsPromise.then(item => {
      console.log('ITEM: ',item);
      
    })
  }

  /**
   * clearShoppingList
   */
  public clearShoppingList() {
    this._shoppingList = new ShoppingList();
    ItemService.listUpdater.emit();
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
      if(item.isPurchased){
        return 1;
      }
    })
  }

  public get items() : Array<Item> {
    return this._shoppingList.items;
  }

  public set items(v: Array<Item>) {
    this._shoppingList.items = v;
  }

  /**
   * onCheck
   * TODO: Change this ineficient routine
   */
  public onCheck() {
    // let isFinished = true;
    // this._shoppingList.items.forEach( (item) => {
    //   if (item.state == State.Listed){
    //     isFinished = false;
    //   }
    // })
    // if (isFinished){
    //   this._shoppingList.isFinished = true;
    // }
  }

  public get storedItems() : Array<Item> {
    return this._storedItems;
  }
  public set storedItems(v : Array<Item>) {
    this._storedItems = v;
  }
  
  /**
   * delete
   */
  public delete(item: Item) {
    let list = this._shoppingList;
    list.items.splice(list.items.indexOf(item), 1);
    this._shoppingList = list;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
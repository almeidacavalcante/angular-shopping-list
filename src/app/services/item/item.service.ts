import { Injectable, EventEmitter } from "@angular/core";
import { Item } from "../../models/Item";
import { ListItemsComponent } from "../../views/shopping/list-items/list-items.component";
import { Subject, Observable, Subscription } from "rxjs";
import { PriceComponent } from "../../views/shopping/price/price.component";
import { ShoppingList } from "../../models/ShoppingList";
import { ItemDaoService } from "../item-dao/item-dao.service";
import { AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class ItemService { 

  private _shoppingList: ShoppingList;
  private _storedItems : Array<Item>;
  public itemsObservable$: Observable<any[]>;

  subscription: Subscription;

  static listUpdater: EventEmitter<ListItemsComponent> = new EventEmitter();
  public purchaseEvent: EventEmitter<PriceComponent> = new EventEmitter();

  constructor(private dao: ItemDaoService) {
    this._shoppingList = new ShoppingList();
    this.itemsObservable$ = dao.itemsObservable$;
  }

  public insertItem(item: Item): void {
    this._shoppingList.add(item);
    // this.dao.addItem(item);
    ItemService.listUpdater.emit();
  }

  
  public get itemsFromServer() : Observable<Item[]> {
    return this.itemsObservable$;
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

  /**
   * addShoppingList
   */
  public saveShoppingList() {
    console.log(this._shoppingList);
    this.dao.save(this._shoppingList);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
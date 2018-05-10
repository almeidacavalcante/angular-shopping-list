import { Injectable } from "@angular/core";
import { Item } from "../../models/Item";


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private _items: Item[];

  constructor() {
    this._items = new Array<Item>();
  }

  public insertItem(item: Item): void {
    this._items.push(item);
  }

  
  public get items() : Item[] {

    return this._items
  }
  
}
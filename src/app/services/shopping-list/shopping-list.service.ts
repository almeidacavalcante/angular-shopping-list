import { Injectable } from '@angular/core';
import { ShoppingList } from '../../models/ShoppingList';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  
  private _shoppingLists : [ShoppingList];

  constructor() { }

  public get shoppingLists() : [ShoppingList] {
    return this._shoppingLists;
  }

  public addShoppingList(shoppingList: ShoppingList){
    this._shoppingLists.push(shoppingList);
  }
}

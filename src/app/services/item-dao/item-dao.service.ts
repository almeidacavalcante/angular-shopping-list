import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ShoppingList } from '../../models/ShoppingList';
import { Item } from '../../models/Item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Price } from '../../models/Price';
import { GenericDao } from '../../shared/dao/generic-dao';
import { DataSnapshot } from '@firebase/database-types';


@Injectable({
  providedIn: 'root'
})
export class ItemDaoService implements GenericDao<Item> {

  
  itemsRef: AngularFireList<ItemInterface[]>;
  itemsSnapshotChanges$ : Observable<any[]>;

  items = new Array<Item>();

  constructor(private db: AngularFireDatabase) {
    this.getAll();
  }

  create(model: Item): Promise<Item> {
    throw new Error("Method not implemented.");
  }
  update(model: any): Promise<Item> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | number): Promise<Item> {
    throw new Error("Method not implemented.");
  }
  get(id: string | number): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<Item[]> {

    return new Promise( (resolve, reject) => {

      this.itemsRef = this.db.list('/items') as AngularFireList<ItemInterface[]>;
      this.itemsSnapshotChanges$ = this.itemsRef.snapshotChanges();

      this.itemsSnapshotChanges$.subscribe( (items: any[]) => {
        items.forEach( item => {
          this.items.push(this.setupItem(item));
        })
        resolve(this.items)
      })
    })
  }
  
  public getItems() {
    return this.items;
  }

  public setupItem(item: {}): Item {
    let tempItem = new Item(item['_name'], item['_unit']);
    tempItem.isPurchased = true;
    tempItem.prices = this.extractPrices(item['_prices']);
    return tempItem;
  }
  
  //TODO: permitir inserir uma data completa por fora.
  extractPrices(prices: object[]): Price[]{
    let tPrices = new Array<Price>();
    prices.forEach((price) => {
      tPrices.push(new Price(price['_value'], price['_date']))
    })
    return tPrices;
  }
}

export interface ItemInterface {
  $key?: string;
  id?:string;
  isPurchased?:boolean;
  name?:string;
  prices?: {
    date?: number,
    value?: number
  };
  unit?: string;
}
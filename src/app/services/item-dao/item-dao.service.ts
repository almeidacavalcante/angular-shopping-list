import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ShoppingList } from '../../models/ShoppingList';
import { Item } from '../../models/Item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Price } from '../../models/Price';
import { GenericDao } from '../../shared/dao/generic-dao';
import { DataSnapshot } from '@firebase/database-types';
import { ItemInterface } from '../../models/interfaces/ItemInterface';
import { ItemConverter } from '../../shared/helpers/ItemConverter';


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
      this.itemsSnapshotChanges$ = this.itemsRef.valueChanges();

      this.itemsSnapshotChanges$.subscribe( (items: any[]) => {
        items.forEach( item => {         
          this.items.push(ItemConverter.setupItem(item));
        })
        resolve(this.items)
      })
    }) 
  }
  
  // Para não ter que recuperar do backend novamente;
  public getItems() {
    return this.items;
  }
}
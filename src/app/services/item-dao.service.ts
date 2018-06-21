import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ShoppingList } from '../models/ShoppingList';
import { Item } from '../models/Item';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Price } from '../models/Price';

import { DataSnapshot } from '@firebase/database-types';
import { ItemInterface } from '../models/interfaces/ItemInterface';
import { ItemConverter } from '../common/helpers/ItemConverter';
import { GenericDao } from '../models/interfaces/generic-dao';


@Injectable({
  providedIn: 'root'
})
export class ItemDaoService implements GenericDao<Item> {
  
  itemsRef: AngularFireList<Item>;
  itemsSnapshotChanges$ : Observable<any[]>;

  items = new Array<Item>();

  constructor(private db: AngularFireDatabase) {
    this.getAll();
  }

  create(model: Item): Promise<Item> {
    console.log('MODEL ID Create: ', model);
    return new Promise<Item>((resolve, reject) => {
      model.isPersisted = true;

      this.itemsRef.push(model)
      resolve();
    });
  }
  update(model: Item): Promise<Item> {
    console.log('MODEL ID: ',model.id);
    
    return new Promise<Item>((resolve, reject) => {
      this.itemsRef.update(model.id, model)
      resolve();
    });
    
  }
  delete(id: string | number): Promise<Item> {
    throw new Error("Method not implemented.");
  }
  get(id: string | number): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<Item[]> {

    return new Promise( (resolve, reject) => {

      this.itemsRef = this.db.list('/items') as AngularFireList<Item>;
      this.itemsSnapshotChanges$ = this.itemsRef.snapshotChanges();

      this.itemsSnapshotChanges$.subscribe( (snapshot: any[]) => {
        snapshot.forEach( snapshotItem => {     
        
          let item = ItemConverter.setupItem(snapshotItem.payload.val());
          item.id = snapshotItem.key;

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
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ShoppingList } from '../../models/ShoppingList';
import { Item } from '../../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemDaoService {

  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection;
  private shoppingListCollection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
    this.itemsCollection = db.collection('items');
    this.shoppingListCollection = db.collection('shoppingLists');
  }

  /**
   * save
   */
  public save(shoppingList: ShoppingList) {
    const id = this.db.createId();



    let sl = JSON.stringify(shoppingList);


    
    console.log(sl);
    
    this.shoppingListCollection.doc(id).set(sl);

  }

  /**
   * addItem
   */
  public addItem(item: Item) {
    const id = this.db.createId();

    const name = item.name;
    const date = item.dateFormat();
    const state = item.state.toString();
    const unit = item.unit.toString();
    
    const dbItem = { id, name, date, state, unit }
    this.itemsCollection.doc(id).set(dbItem);
  }

  /**
   * updateItem
   * item: Item   */
  public updateItem(item: Item) {
    
  }

  /**
   * getItems
   */
  public getItems() {
    return this.items;
  }

  /**
   * log
   */
  public async log() {
    let log = await this.items;
    log.forEach((items) => {
      items.forEach((item) => {
        console.log(item);
      })
    })    
  }
}

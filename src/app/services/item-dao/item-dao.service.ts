import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';
import { ShoppingList } from '../../models/ShoppingList';

@Injectable({
  providedIn: 'root'
})
export class ItemDaoService {

  items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
    console.log(this.items);
    
  }

  /**
   * save
   */
  public save(shoppingList: ShoppingList) {
    

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
    console.log(log);
    
  }
}

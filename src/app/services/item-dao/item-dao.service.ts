import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ShoppingList } from '../../models/ShoppingList';
import { Item } from '../../models/Item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ItemDaoService {

  itemsRef: AngularFireList<Item>;
  private itemsCollection: AngularFirestoreCollection;
  private shoppingListCollection: AngularFirestoreCollection;

  constructor(private db: AngularFireDatabase) {

    //TODO: Não seria interessante tirar esse hardcode e colocar em um enum?
    //Para que possamos fazer assim: Firebase.ShoppingList e lá colocaríamos o 'shopping-list'
    this.itemsRef = db.list('items');
  }

  /**
   * save
   */
  public save(shoppingList: ShoppingList) {

    //decompor a lista em items
    //salvar os itens individualmente
    //na maioria das vezes vamos so atualizar os novos precos
    shoppingList.items.forEach( (item) => {
      this.saveItem(item);
    })
    console.log('Shopping List Added!');
  }

  /**
   * saveItem
   */
  public saveItem(item: Item) {
    if (item.id == undefined) {
      this.itemsRef.push(item)
    }else{
      let ref = this.db.object('/items/' + item.id);
      ref.update(item)
    }

  }

  /**
   * addItem
   */
  public addItem(item: Item) {

  }

  /**
   * updateItem
   * item: Item   */
  public updateItem(item: Item) {
    
  }
}

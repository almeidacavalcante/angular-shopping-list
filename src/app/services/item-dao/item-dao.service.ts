import { Injectable, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ShoppingList } from '../../models/ShoppingList';
import { Item } from '../../models/Item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Price } from '../../models/Price';


@Injectable({
  providedIn: 'root'
})
export class ItemDaoService implements OnInit {

  items$: AngularFireList<Item>;

  items = new Array<Item>();

  itemsObservable$ : Observable<Item[]>;

  _itemsPromise: Promise<Item[]>;

  constructor(private db: AngularFireDatabase) {
    this.getItemsFromServer();
  }

  ngOnInit(){
    
  }

  /**
   * getItemsFromServer
   */
  public getItemsFromServer(){
    this.items$ = this.db.list('/items');
    console.log('this.items$', this.items$);
    this.itemsObservable$ = this.items$.valueChanges()
    this.items$.snapshotChanges();
  }

  
  public get itemsPromise() : Promise<Item[]> {
    return this._itemsPromise;
  }
  

  public setupItem(item: {}) {
    let tempItem = new Item(item['_name'], item['_unit']);
    tempItem.isPurchased = true;
    tempItem.prices = this.extractPrices(item['_prices']);

    console.log('Constructed Item: ', tempItem);
    
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

  /**
   * save
   */
  public save(shoppingList: ShoppingList) {

    //TODO: decompor a lista em items
    //TODO: salvar os itens individualmente
    //TODO: testar sse o elemento ja existe. Em caso positivo, adicionar apenas um price
    //TODO: na maioria das vezes vamos so atualizar os novos precos
    shoppingList.items.forEach( (item) => {
      
      this.saveItem(item);
    })
    console.log('Shopping List Added!');
  }


  public saveItem(item: Item) {
    if (item.id == undefined) {
      this.items$.push(item);
      
    }else{
      let ref = this.db.object('/items/' + item.id);
      ref.update(item)
    }
  }

  public getItems() {
    return this.items;
  }
  

  public addItem(item: Item) {

  }

  /**
   * updateItem
   * item: Item   */
  public updateItem(item: Item) {
    this.items$.update('/items/', item);
  }
}

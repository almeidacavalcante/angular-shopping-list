import { Component, OnInit } from '@angular/core';
import { ShoppingList } from '../../../models/ShoppingList';
import { ItemService } from '../../../services/item.service';
import { Market } from '../../../models/Market';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


@Component({
  selector: 'app-shopping-view',
  templateUrl: './shopping-view.component.html',
  styleUrls: ['./shopping-view.component.css']
})
export class ShoppingViewComponent implements OnInit {

  public isFinished: boolean = true;
  public markets = new Array<Market>();
  public marketNames = new Array<string>();
  private _selectedMarket : string;
  
  
  
  private config = {
    characters: 1,
    numberOfChoices: 10,
    debounceTime: 50,
  }
  
  constructor(private service: ItemService) {
    this.setupMockMarkets();
  }
  
  /**
   * @param marketName Nome do Mercado onde as compras estão sendo feitas no momento
   * @description Chama o serviço e insere o mercado na shoppingList atual
   */
  public insertMarket(marketName: string) {
    
    // this.service.insertMarket(marketName)
  }
  
  public get selectedMarket() : string {
    return this._selectedMarket;
  }

  public set selectedMarket(v : string) {
    this._selectedMarket = v;
  }
  
  private setupMockMarkets() {
    let m1 = new Market('Carrefour');
    let m2 = new Market('Nordestão');
    let m3 = new Market('Hyper');
    m1.id = 'car1';
    m2.id = 'nor1';
    m3.id = 'hyp1';
    this.markets.push(m1, m2, m3);
    this.markets.forEach(market => {
      this.marketNames.push(market.name);
    });
  }

  private setupSubscription() {
    this.service.storedItems.forEach( item => {
      this.marketNames.push(item.name);
      
    })
}

public search = 
  (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(this.config.debounceTime),
    distinctUntilChanged(),
    map(term => term.length < this.config.characters ? []
      : this.marketNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, this.config.numberOfChoices))
  );

  ngOnInit() {
    
  }

  /**
   * save
   */
  public save() {
    if (this.isFinished) {
      this.service.saveShoppingList();
      this.service.clearShoppingList();
    }else{
      throw new Error('You cannot save a shoppingList while is there any unpurchased items');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ShoppingList } from '../../../models/ShoppingList';
import { ItemService } from '../../../services/item.service';
import { Market } from '../../../models/Market';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MarketService } from '../../../services/market.service';


@Component({
  selector: 'app-shopping-view',
  templateUrl: './shopping-view.component.html',
  styleUrls: ['./shopping-view.component.css']
})
export class ShoppingViewComponent implements OnInit {

  public isFinished: boolean = true;
  public markets = new Array<Market>();
  public marketName: string;
  private _selectedMarket : Market
  public marketNotFound = false;
  
  private config = {
    characters: 1,
    numberOfChoices: 10,
    debounceTime: 50,
  }
  
  constructor(private itemService: ItemService, private marketService: MarketService) {
    // this.setupMockMarkets();
    this.marketService.markets.then( markets => {
      debugger
      this.markets = markets;
      console.log('Mercados integrados!');
    })
  }

  /**
   * createMarket
   * @param marketName: @type string
   * cria e persiste um novo mercado no banco de dados
   * deixando-o disponivel para o autocomplete
   */

  public createMarket(marketName: string) {
    this.marketService.add(marketName);
  }
  
  /**
   * @param marketName Objeto Market
   * @description Chama o serviço e insere o mercado na shoppingList atual
   */
  public insertMarket(marketName: string) {
    let market = this.getMarketByName(marketName);

    if (market == null){
      this.createMarket(marketName);
    }else {
      this.itemService.insertMarket(market);
    }
  }

  /**
   * getMarketByName
   * @param marketName nome do mercado para retornar o objeto completo
   */
  public getMarketByName(marketName: string): Market {
    let index = this.markets.findIndex( market => {
      return market.name == marketName;
    })

    if (index > -1) return this.markets[index];
  }
  
  public get selectedMarket() : Market {
    return this._selectedMarket;
  }

  public set selectedMarket(v : Market) {
    this._selectedMarket = v;
  }

  private setupSubscription() {
    // this.service.storedItems.forEach( item => {
    //   this.marketNames.push(item.name);
      
    // })
}

public search = 
  (text$: Observable<string>) => 
    text$.pipe(
      debounceTime(this.config.debounceTime),
      distinctUntilChanged(),
      map(term => term.length < this.config.characters ? []
        : this.markets.map(market => market.name).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, this.config.numberOfChoices))
    );
  

  ngOnInit() {
    
  }

  /**
   * save
   */
  public save() {
    if (this.isFinished) {
      this.itemService.saveShoppingList();
      this.itemService.clearShoppingList();
    }else{
      throw new Error('You cannot save a shoppingList while is there any unpurchased items');
    }
  }
}

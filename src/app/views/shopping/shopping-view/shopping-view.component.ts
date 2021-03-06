import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ShoppingList } from '../../../models/ShoppingList';
import { ItemService } from '../../../services/item.service';
import { Market } from '../../../models/Market';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MarketService } from '../../../services/market.service';


@Component({
  selector: 'app-shopping-view',
  templateUrl: './shopping-view.component.html',
  styleUrls: ['./shopping-view.component.css']
})
export class ShoppingViewComponent implements OnInit {

  public isFinished = false;
  public isMarketSelected = false;
  public markets = new Array<Market>();
  public marketName: string;

  private _itemSubscription: Subscription;

  @ViewChild('varMarket') varMarket: HTMLInputElement;

  private config = {
    characters: 1,
    numberOfChoices: 10,
    debounceTime: 50,
  };

  constructor(private itemService: ItemService, private marketService: MarketService) {
    // this.setupMockMarkets();
    this.marketService.markets.then( markets => {
      this.markets = markets;
    });

    this._itemSubscription = this.itemService.purchaseEvent.subscribe( _ => this.stateHandler() );
  }

  /**
   * stateHandler
   */
  public stateHandler() {
    this.isFinished = this.itemService.getShoppingListState();
  }

  /**
   * createMarket
   * @param marketName: @type string
   * cria e persiste um novo mercado no banco de dados
   * deixando-o disponivel para o autocomplete
   */

  public async createMarket(marketName: string) {
    // poderia retornar um promise com o mercado para ser adicionado na lista.
    this.marketService.add(marketName).then( market => {
      this.marketService.selectedMarket = market;
      this.markets.push(market);
    });
  }

  /**
   * @param marketName Objeto Market
   * @description Chama o serviço e insere o mercado na shoppingList atual
   */
  public insertMarket(marketName: string) {
    this.isMarketSelected = true;
    const market = this.getMarketByName(marketName);
    if (market == null) {
      this.createMarket(marketName);
    } else {
      this.marketService.selectedMarket = market;
    }
  }

  /**
   * editMarket
   */
  public editMarket() {
    this.isMarketSelected = false;
    this.marketService.selectedMarket = null;
  }

  /**
   * getMarketByName
   * @param marketName nome do mercado para retornar o objeto completo
   */
  public getMarketByName(marketName: string): Market {
    const index = this.markets.findIndex( market => {
      return market.name === marketName;
    });

    if (index > -1) { return this.markets[index]; }
  }

  public get selectedMarket(): Market {
    return this.marketService.selectedMarket;
  }

  public set selectedMarket(v: Market) {
    this.marketService.selectedMarket = v;
  }

  private setupSubscription() {
    // this.service.storedItems.forEach( item => {
    //   this.marketNames.push(item.name);
    // })
}

public search = (text$: Observable<string>) => 
  text$.pipe(
    debounceTime(this.config.debounceTime),
    distinctUntilChanged(),
    map(term => term.length < this.config.characters ? []
      : this.markets.map(market => market.name).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
        .slice(0, this.config.numberOfChoices)
      )
    )

  ngOnInit() { }


  /**
   * clear the market input
   */
  public clear() {
    this.marketName = '';
    this.isMarketSelected = false;
    this.isFinished = false;  
    this.marketService.selectedMarket = null;
  }

  /**
   * save
   */
  public save() {
    if (this.isFinished) {
      this.itemService.saveShoppingList();
      this.itemService.clearShoppingList();
      this.clear();
    } else {
      throw new Error('You cannot save a shoppingList while is there any unpurchased items');
    }
  }
}

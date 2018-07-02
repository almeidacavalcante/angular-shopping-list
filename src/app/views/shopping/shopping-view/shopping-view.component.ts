import { Component, OnInit } from '@angular/core';
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

  public isFinished = true;
  public markets = new Array<Market>();
  public marketName: string;

  private config = {
    characters: 1,
    numberOfChoices: 10,
    debounceTime: 50,
  };

  constructor(private itemService: ItemService, private marketService: MarketService) {
    // this.setupMockMarkets();
    this.marketService.markets.then( markets => {
      this.markets = markets;
      console.log('Mercados integrados!');
    });
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
      debugger
      this.marketService.selectedMarket = market;
      this.markets.push(market);
    });
  }

  /**
   * @param marketName Objeto Market
   * @description Chama o serviço e insere o mercado na shoppingList atual
   */
  public insertMarket(marketName: string) {
    const market = this.getMarketByName(marketName);

    if (market == null) {
      this.createMarket(marketName);
    } else {
      this.itemService.insertMarket(market);
    }
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
   * save
   */
  public save() {
    if (this.isFinished) {
      this.itemService.saveShoppingList();
      this.itemService.clearShoppingList();
    } else {
      throw new Error('You cannot save a shoppingList while is there any unpurchased items');
    }
  }
}

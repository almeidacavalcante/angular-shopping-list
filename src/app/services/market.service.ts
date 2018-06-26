import { Injectable } from '@angular/core';
import { MarketDaoService } from './market-dao.service';
import { Market } from '../models/Market';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private _markets: Promise<Market[]>;

  constructor(private dao: MarketDaoService) { 
    this._markets = dao.getAll();
  }
  
  public get markets() : Promise<Market[]> {
    return this._markets;
  } 

  /**
   * add
   * @param name: @type string
   * 
   * TODO: Dar resposta apos a insercao
   */
  public add(name: string) {
    this.dao.create(new Market(name))
  }
}

import { Injectable } from '@angular/core';
import { GenericDao } from '../models/interfaces/generic-dao';
import { Market } from '../models/Market';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketDaoService implements GenericDao<Market>{
  
  private _marketsRef: AngularFireList<Market>;
  private _marketsSnapshotChanges$: Observable<any[]>;

  private _markets: Array<Market> = new Array<Market>();
  
  constructor(private db: AngularFireDatabase) { 
    this._marketsRef = this.db.list('/markets') as AngularFireList<Market>;
    this._marketsSnapshotChanges$ = this._marketsRef.snapshotChanges();
  }

  create(model: Market): Promise<Market> {
    console.log('Market: ', model);
    return new Promise( resolve => {
      let id = this._marketsRef.push(model).key;
      model.id = id;
      resolve(model);
    })
  }

  update(model: any): Promise<Market> {
    throw new Error("Method not implemented.");
  }

  delete(id: string | number): Promise<Market> {
    throw new Error("Method not implemented.");
  }

  get(id: string | number): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<Market[]> {
    return new Promise( (resolve, reject) => {
      this._marketsSnapshotChanges$.subscribe( (snapshot: any[]) => {
        snapshot.forEach( snapshotMarket => {     
        
          let market = this.setupMarket(snapshotMarket.payload.val());
          market.id = snapshotMarket.key;

          this._markets.push(market);
        })        
        resolve(this._markets)
      })
    }) 
  }

  private setupMarket(json: {}): Market {
    return new Market(json['_name']);
  }
}

import { Item } from "./Item";
import { Market } from "./Market";

export class ShoppingList {
    
    private _market : Market;
    private _date : Date;
    private _items : Item;

    constructor(market: Market){
        this._market = market;
    }

    public get items() : Item {
        return this._items;
    }
    public set items(v : Item) {
        this._items = v;
    }
    public get date() : Date {
        return this._date;
    }
    public set date(v : Date) {
        this._date = v;
    }
    
    public get market() : Market {
        return this._market;
    }
    public set market(v : Market) {
        this._market = v;
    }
    
}
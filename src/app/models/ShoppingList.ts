import { Item } from "./Item";
import { Market } from "./Market";

export class ShoppingList {
    
    private _market : Market;
    private _date : number;
    private _items : Array<Item>;
    private _isFinished = false;

    constructor(){
        this._items = new Array<Item>();
        this._date = new Date().getTime();
    }

    /**
     * add
     */
    public add(item: Item) {
        this._items.push(item);
    }

    /**
     * isFinished
     */
    public set isFinished(flag: boolean) {
        this.isFinished = flag;
    }

    public get items() : Array<Item> {
        return this._items;
    }

    public get date() : number {
        return this._date;
    }
    public set date(v : number) {
        this._date = v;
    }
    
    public get market() : Market {
        return this._market;
    }
    public set market(v : Market) {
        this._market = v;
    }
    
}
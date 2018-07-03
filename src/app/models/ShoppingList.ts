import { Item } from "./Item";
import { Market } from "./Market";

export class ShoppingList {
    
    private _date : number;
    private _items : Array<Item>;
    private _isFinished: boolean;

    constructor(){
        this._items = new Array<Item>();
        this._date = new Date().getTime();
        this._isFinished = false;
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
        this._isFinished = flag;
    }

    public get isFinished(): boolean {
        return this._isFinished;
    }

    public get items() : Array<Item> {
        return this._items;
    }

    public set items(v: Array<Item>) {
        this._items = v;
    }

    public get date() : number {
        return this._date;
    }
    public set date(v : number) {
        this._date = v;
    }   
}
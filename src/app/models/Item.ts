import { Market } from "./Market";
import { Price } from "./Price";

export class Item {

    private _id : string;
    private _name: string;
    private _market: Market;
    private _prices: Array<Price>;
    private _unit: Unit;
    private _isPurchased: boolean;

    constructor(name: string, unit: Unit){
        this._name = name;
        this._unit = unit;
        this._isPurchased = false;
        this._prices = new Array<Price>();
    }

    public toggleIsPurchasedState() {
        this._isPurchased = !this._isPurchased;
    }
    public get id() : string {
        return this._id;
    }
    public set id(v : string) {
        this._id = v;
    }
    public get isPurchased(): boolean{
        return this._isPurchased;
    }

    public set isPurchased(v: boolean){
        this._isPurchased = v;
    }
    
    public get name() : string {
        return this._name;
    }

    public get unit() : string {
        return this._unit;
    }

    public get prices() : Price[] {
        return this._prices;
    }

    /**
     * actualPrice
     */
    public get actualPrice(): Price {
        if (this.prices.length > 0) {
            return this.prices[this.prices.length-1];
        }
        console.log("THERE'S NO PRICES YET");
    }
  
    /**
     * purchase
     //TODO: Aqui o item recebe um preço, mas este deverá ser inserido numa lista de preços no firebase
     */
    public purchase(price: Price) : void {
        this.isPurchased = true;
        if (this.prices != undefined && this.prices != null){
            this.prices.push(price);
        }
    }
}

export enum Unit {
    Kg = 'Kilogram',
    Package = 'Package',
    Lt = 'Litre'
}
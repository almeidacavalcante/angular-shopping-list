export class Item {

    private _name: string;
    private _price: number;
    private _date: Date;
    private _unit: Unit;
    private _state: State;

    constructor(name: string, date: Date, unit: Unit){
        this._name = name;
        this._date = date;
        this._unit = unit;
        this._state = State.Listed;
        this._price = undefined;
    }
    
    public get name() : string {
        return this._name;
    }

    public get date() : Date {
        return this._date;
    }

    public get unit() : string {
        return this._unit;
    }

    public set state(v : State) {
        this._state = v;
    }
    
    public get state() : State {
        return this._state;
    }

    public get price() : number {
        return this._price;
    }
    public set price(v : number) {
        this._price = v;
    }
    
    
    /**
     * purchase
     */
    public purchase(price: number) : void {
        this.state = State.Purchased;
        this.price = price;
    }

    /**
     * dateFormat
     */
    public dateFormat() {
        return `${this._date.getDate()}/${this._date.getMonth()}/${this._date.getFullYear()}`;
    }
}

export enum Unit {
    Kg = 'Kilogram',
    Package = 'Package',
    Lt = 'Litre'
}

export enum State {
    Listed = 'Listed',
    Purchased = 'Purchased',
}
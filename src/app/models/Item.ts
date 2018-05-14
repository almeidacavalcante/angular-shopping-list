export class Item {

    private _name: string;
    private _date: Date;
    private _unit: Unit;
    private _state: State;

    constructor(name: string, date: Date, unit: Unit){
        this._name = name;
        this._date = date;
        this._unit = unit;
        this._state = State.Listed;
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
    
    
    /**
     * purchase
     */
    public purchase() {
        this.state = State.Purchased;
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
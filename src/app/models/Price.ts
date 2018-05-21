

export class Price {
    private _date : number;
    private _value : number;

    constructor(value: number, date?: number){
        if (date){
            this._date = date;
            this._value = value;
        }else{
            this._date = new Date().getTime();      
            this._value = value;
        }
    }

    public get value() : number {
        return this._value;
    }
    public set value(v : number) {
        this._value = v;
    }
    public get date() : number {
        return this._date;
    }
    public set date(v : number) {
        this._date = v;
    }
}
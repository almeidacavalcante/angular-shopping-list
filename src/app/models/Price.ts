

export class Price {
    private _date : number;
    private _value : number;
    private _marketId : string;

    constructor(value: number, date?: number, marketId?: string){
        if (date){
            this._date = date;
            this._value = value;
            this._marketId = marketId;
        }else{
            this._date = new Date().getTime();      
            this._value = value;
            this._marketId = marketId;            
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
    public get marketId() : string {
        return this._marketId;
    }
    public set marketId(v : string) {
        this._marketId = v;
    }
    
}
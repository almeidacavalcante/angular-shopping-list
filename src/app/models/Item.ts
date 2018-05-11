export class Item {

    private _name: string;
    private _date: Date;

    constructor(name: string, date: Date){
        this._name = name;
        this._date = date;
    }
    
    public get name() : string {
        return this._name;
    }

    public get date() : Date {
        return this._date;
    }

    /**
     * dateFormat
     */
    public dateFormat() {
        return `${this._date.getDate()}/${this._date.getMonth()}/${this._date.getFullYear()}`;
    }
}
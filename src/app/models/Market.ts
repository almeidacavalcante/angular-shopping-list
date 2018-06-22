export class Market {
    
    private _name: string;
    private _id : string;
        
    constructor(name: string) {
        this.name = name;
    }
    
    public get id() : string {
        return this._id;
    }
    public set id(v : string) {
        this._id = v;
    }
    public get name(): string {
        return this._name;
    }

    public set name(v: string) {
        this._name = v;
    }
}
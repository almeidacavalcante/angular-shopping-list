export class Market {
    
    private _name: string;

    constructor(name: string) {
        this.name = name
    }

    public get name(): string {
        return this._name;
    }

    public set name(v: string) {
        this._name = v;
    }
}
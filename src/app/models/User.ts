export class User {

    private _name: string;
    private _email: string;
    private _password: string;
    private _username: string;
    private _authorization: string;
    private _token: string;
    private _id : string;

    constructor(
        name: string,
        email: string,
        username: string,
        password: string
    ){
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
    }
    
    public get id() : string {
        return this._id;
    }
    public set id(v : string) {
        this._id = v;
    }
    public get token(): string {
        return this._token;
    }
    public set token(v: string) {
        this._token = v;
    }
    public get authorization(): string {
        return this._authorization;
    }
    public set authorization(v: string) {
        this._authorization = v;
    }
    public get username(): string {
        return this._username;
    }
    public set username(v: string) {
        this._username = v;
    }
    public get password(): string {
        return this._password;
    }
    public set password(v: string) {
        this._password = v;
    }
    public get email(): string {
        return this._email;
    }
    public set email(v: string) {
        this._email = v;
    }
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }
}
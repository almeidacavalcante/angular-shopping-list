import { Injectable } from '@angular/core';
import { GenericDao } from '../models/interfaces/generic-dao';
import { User } from '../models/User';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AuthDaoService implements GenericDao<User>{
  
  private _userRef : AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.userRef = this.db.list('/users') as AngularFireList<User>;
  }

  create(model: User): Promise<User> {
    console.log('MODEL ID Create: ', model);
    return new Promise<User>((resolve, reject) => {
      this.userRef.push(model);
      resolve();
    });
  }

  update(model: any): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | number): Promise<User> {
    throw new Error("Method not implemented.");
  }
  get(id: string | number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  public get userRef() : AngularFireList<User> {
    return this._userRef;
  }
  public set userRef(v : AngularFireList<User>) {
    this._userRef = v;
  }
}

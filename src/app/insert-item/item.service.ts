import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  public insertItem(itemName: string, callback: Function): void {
    console.log(`The item: ${itemName} is saved.`);
    return callback();
  }
}

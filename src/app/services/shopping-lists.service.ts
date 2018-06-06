import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService {

  mockShoppingList = [
    {id: 1, market: "Carrefour", shoppingList: ['Rice','Lemon','Sugar','Beans','Pasta','Orange','Forks']},
    {id: 2, market: "Walmart", shoppingList: ['Avocado','Lemon','Sugar','Beans','Sause','Orange','Forks']},
    {id: 3, market: "Nordestão", shoppingList: ['Lemon','Book','Sugar','Rice','Pasta','Orange','Eggs']},
    {id: 4, market: "Hiper", shoppingList: ['Sugar','Lemon','Sugar','Eggs','Pasta','Rice','Vegetables']}
  ]

  constructor() { }

  getAll(){
    return this.mockShoppingList;
  }
}

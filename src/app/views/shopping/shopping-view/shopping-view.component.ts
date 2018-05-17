import { Component, OnInit } from '@angular/core';
import { ShoppingList } from '../../../models/ShoppingList';

@Component({
  selector: 'app-shopping-view',
  templateUrl: './shopping-view.component.html',
  styleUrls: ['./shopping-view.component.css']
})
export class ShoppingViewComponent implements OnInit {

  public isFinished: boolean = false;
  private shoppingList: ShoppingList;

  constructor() { }

  ngOnInit() {
    
  }

}

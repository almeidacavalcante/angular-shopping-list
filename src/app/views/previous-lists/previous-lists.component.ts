import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListsService } from '../../services/shopping-lists.service';

@Component({
  selector: 'previous-lists',
  templateUrl: './previous-lists.component.html',
  styleUrls: ['./previous-lists.component.css']
})
export class PreviousListsComponent implements OnInit {

  items;
  shoppingList = [];

  constructor(
    private service: ItemService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private shoppingListsService: ShoppingListsService
  ) { }

  //Navegação imperativa
  public submit() {
    this.router.navigate( ['/previous-list', '2', 'Carrefour'], {
      queryParams: {
        page: 1,
        order: 'newest'
      }
    })
  }


  ngOnInit() {
    this.shoppingList = this.shoppingListsService.getAll();
    this.items = this.service.items;
    this.route.paramMap.subscribe(params => {
      console.log(params);
      
    });
  }
}

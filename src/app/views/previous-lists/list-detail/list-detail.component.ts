import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListsService } from '../../../services/shopping-lists.service';

@Component({
  selector: 'list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit, OnDestroy {

  private id: string;
  private subscription: Subscription;

  mockListDetail = []

  currentDetail = {}
  
  constructor(
    private route: ActivatedRoute,
    private shoppingListsService: ShoppingListsService
  ) { }
  
  ngOnInit() {
    this.mockListDetail = this.shoppingListsService.getAll();
    this.subscription = this.route.params.subscribe( (params: any) => {
      this.id = params['id'];
      
      this.currentDetail = this.getListDetailById(this.id);
      console.log(this.currentDetail);
      
    })

  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
  getListDetailById(id: string): any{
    let temp;
    this.mockListDetail.forEach( detail => {  
      if (+detail.id == +id) temp = detail;
    })
    return temp
  }
}

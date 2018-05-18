import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item/item.service';

@Component({
  selector: 'previous-lists',
  templateUrl: './previous-lists.component.html',
  styleUrls: ['./previous-lists.component.css']
})
export class PreviousListsComponent implements OnInit {

  items;

  constructor(private service: ItemService) { }

  ngOnInit() {
    this.items = this.service.obsItems;
    console.log(this.items);
    
  }

}

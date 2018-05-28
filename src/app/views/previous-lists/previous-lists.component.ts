import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'previous-lists',
  templateUrl: './previous-lists.component.html',
  styleUrls: ['./previous-lists.component.css']
})
export class PreviousListsComponent implements OnInit {

  items;

  constructor(private service: ItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.items = this.service.items;
    this.route.paramMap.subscribe(params => {
      console.log(params);
      
    });
    
  }

}

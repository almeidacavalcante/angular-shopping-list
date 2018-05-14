import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item/item.service';
import * as $ from "../../../../../node_modules/jquery/dist/jquery";

@Component({
  selector: 'price-popup',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
  providers: [ItemService]
})
export class PriceComponent implements OnInit {

  public isVisible: boolean = true;
  
  constructor(private service: ItemService) {
    service.show.subscribe((val:boolean) => this.isVisible = val)
  }

  openModal(){
    $('#price-modal').modal('show');
  }

  ngOnInit() {

  }
}

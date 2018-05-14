import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { ItemService } from '../../../services/item/item.service';
import { Item } from '../../../models/Item';
import { ShoppingController } from '../../../controllers/shopping-controller';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PriceComponent } from '../price/price.component';
import { Subject, Observable } from 'rxjs';


@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent {

  private items : Item[];
  private closeResult: string;

  @Input() valor = 1;

  @ViewChild('campoInput') campoInput: ElementRef;
  @ViewChild('pricePopup') pricePopup: PriceComponent;



  constructor(private service: ItemService, private modalService: NgbModal) { 

  }

  ngOnInit() {
    this.service.listUpdater.subscribe( () => {
        console.log('listUpdated subscribe()');
      	
        this.items = this.service.items;
      }
    );
  }

  /**
   * update
   */
  public update(items: Item[]) {
    this.items = this.service.items;
  }

  /**
   * takeAction
   */
  public takeAction(item: Item, event: Event) {
    if (event.srcElement.getAttribute('id') == Action.purchase){
      console.log('takeAction()');
      console.log(this.pricePopup);
      this.pricePopup.open(item);
      
      this.service.purchase(item);

      
      let button = event.srcElement;      
      
    }else if (event.srcElement.getAttribute('id') == Action.delete){
      this.service.delete(item);
    }
  }
}

enum Action {
  purchase = 'purchase',
  delete = 'delete'
}

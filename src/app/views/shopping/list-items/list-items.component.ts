import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef, OnDestroy } from '@angular/core';
import { Item } from '../../../models/Item';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PriceComponent } from '../price/price.component';
import { Subject, Observable, Subscription } from 'rxjs';
import { ItemService } from '../../../services/item.service';
import { MarketService } from '../../../services/market.service';
import { Market } from '../../../models/Market';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, OnDestroy {

  private items : Item[];
  private closeResult: string;
  private subscription: Subscription;
  
  @Input('disabled') disabled: boolean;
  @ViewChild('campoInput') campoInput: ElementRef;
  @ViewChild('table') table: ElementRef;

  constructor(private service: ItemService, private modalService: NgbModal, private marketService: MarketService) { }

  ngOnInit() {
    this.subscription = ItemService.listUpdater.subscribe( () => {
      console.log('listUpdated: EVENT RECEIVED!');
      this.items =  this.service.items;
    });
  }

  /**
   * update
   */
  public update(items: Item[]) {
    console.log('IMPLEMENT ESTE METODO!');
  }

  /**
   * takeAction
   */
  public takeAction(item: Item, event: Event) {
    if (event.srcElement.getAttribute('id') == Action.delete){
      this.service.delete(item);
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

enum Action {
  purchase = 'purchase',
  delete = 'delete'
}

import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef, OnDestroy } from '@angular/core';
import { ItemService } from '../../../services/item/item.service';
import { Item } from '../../../models/Item';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PriceComponent } from '../price/price.component';
import { Subject, Observable, Subscription } from 'rxjs';
import { NgElseDirective } from "../../../shared/ng-else.directive";

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, OnDestroy {

  private items : Item[];
  private closeResult: string;
  private subscription: Subscription;

  @ViewChild('campoInput') campoInput: ElementRef;

  constructor(private service: ItemService, private modalService: NgbModal) { 

  }

  ngOnInit() {
    this.subscription = ItemService.listUpdater.subscribe( () => {
        console.log('listUpdated: EVENT RECEIVED!');
        this.items = this.service.items;
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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
    if (event.srcElement.getAttribute('id') == Action.delete){
      this.service.delete(item);
    }
  }
}

enum Action {
  purchase = 'purchase',
  delete = 'delete'
}

import { Component, Input } from '@angular/core';
import * as $ from "jquery";
import { NgbModule, ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DecimalPipe } from '@angular/common';
import { Item } from '../../../models/Item';
import { Subscription } from 'rxjs';
import { Price } from '../../../models/Price';
import { ItemService } from '../../../services/item.service';
import { Market } from '../../../models/Market';


@Component({
  selector: 'price-popup',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent{

  closeResult: string;

  //TODO: DUMMY NUMBER
  public likes = 0;

  public value : number;
  @Input() item : Item;
  @Input() market : Market;

  constructor(private modalService: NgbModal, public service: ItemService) {
    this.market = this.service.market;
  }

  /**
   * onLikeChanged
   */
  public onLikeChanged(isActive) {
    console.log("onLikeChanged: ", isActive);    
  }


  open(content) {
    
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
      if (result == 'delete'){
        this.service.delete(this.item);
      }else{
        this.purchaseRoutine();
      }     
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    $('.form-control').focus();
  }

  private purchaseRoutine(): void {
    this.item.purchase(new Price(this.value, new Date().getTime(), this.market.id));
    this.service.sortItems();
    this.service.onCheck();
    console.log(this.item);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

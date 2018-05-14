import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item/item.service';
import * as $ from "jquery";
import { NgbModule, ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'price-popup',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
  providers: [ItemService]
})
export class PriceComponent implements OnInit{

  closeResult: string;
  private subsctiontion: any;

  constructor(private modalService: NgbModal, private service: ItemService) {

  }

  ngOnInit(){
    
    this.service.purchaseEvent.subscribe( () => {
      console.log('subscribing...');
      
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

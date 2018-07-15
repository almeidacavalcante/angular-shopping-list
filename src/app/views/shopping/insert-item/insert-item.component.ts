import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as $ from "../../../../../node_modules/jquery";

import { ListItemsComponent } from '../list-items/list-items.component';
import { Item, Unit } from '../../../models/Item';
import { ItemService } from '../../../services/item.service';

import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Price } from '../../../models/Price';



@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.component.html',
  styleUrls: ['./insert-item.component.css']
})
export class InsertItemComponent {
  public unit: Unit = Unit.Kg;

  @ViewChild('cItem') input: ElementRef;
  @Input('disabled') disabled: boolean = true;

  @Input('onFocus') set onFocus(value: boolean) {
    if (value) {
      this.input.nativeElement.disabled = false;
      this.input.nativeElement.focus();
    }
  }
  
  public itemName: string;
  public itemNames = [];
  
  private config = {
    characters: 1,
    numberOfChoices: 10,
    debounceTime: 50,
  }

  public search = 
    (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(this.config.debounceTime),
      distinctUntilChanged(),
      map(term => term.length < this.config.characters ? []
        : this.itemNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, this.config.numberOfChoices))
    );
  
  private _subscription: Subscription;

  constructor(private service: ItemService) {
    this._subscription = service.itemEvent.subscribe( (items) => {
      this.setupSubscription();
    })
  }


  private setupSubscription() {
      this.service.storedItems.forEach( item => {
        this.itemNames.push(item.name);
        
      })
  }
  
  
  private insertItem() {
    if (this.itemName != '') {
      let item = new Item(this.itemName, this.unit);

      let selectedItemIndex = this.itemNames.indexOf(this.itemName)

      if (selectedItemIndex > -1) {
        this.service.insertItem(this.settingSelectedItem());
      } else {
        this.service.insertItem(item);
      }
      this.itemName = '';
    }
  }

  private settingSelectedItem() {
    let idx = this.itemNames.indexOf(this.itemName);
    let selectedItem = this.service.storedItems[idx];
    selectedItem.isPurchased = false;
    return selectedItem;
  }

  /**
   * toggle
   */
  public toggle(event: Event) {
    console.log(event.target);
    (<Element>event.target).setAttribute('checked', '');
    console.log((<Element>event.target).parentElement.parentElement);
    $(event.target).button('toggle')
  }


  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
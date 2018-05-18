import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent{

  @Input('likesCount') likesCount: number;
  @Input('isActive') isActive: boolean;

  @Output('change') change = new EventEmitter();

  constructor() { }

  /**
   * onClick
   */
  public onClick() {
    this.isActive = !this.isActive;    
    this.change.emit(this.isActive);
  }

}

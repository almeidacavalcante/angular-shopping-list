import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit, OnDestroy {

  private id: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute) { }
 
  ngOnInit() {
    this.subscription = this.route.params.subscribe( (params: any) => {
      this.id = params['id'];
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

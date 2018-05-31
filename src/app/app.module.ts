import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";

import { ShoppingModule } from './views/shopping/shopping.module';
import { ItemService } from './services/item/item.service';
import { LoginComponent } from './views/login/login.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { PreviousListsComponent } from './views/previous-lists/previous-lists.component';
import { ListDetailComponent } from './views/previous-lists/list-detail/list-detail.component';
import { ItemDaoService } from './services/item-dao/item-dao.service';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { ZippyComponent } from './common/zippy/zippy.component';
import { AppRoutingModule } from './modules/routing/app.routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ShoppingModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'shopping-list-app2018')
  ], 
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PreviousListsComponent,
    ListDetailComponent,
    ZippyComponent
  ],
  providers: [
    ItemService,
    ItemDaoService,
    AngularFireDatabaseModule,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

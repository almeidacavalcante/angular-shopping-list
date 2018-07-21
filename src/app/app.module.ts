import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";

import { ShoppingModule } from './views/shopping/shopping.module';
import { ItemService } from './services/item.service';
import { LoginComponent } from './views/login/login.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { PreviousListsComponent } from './views/previous-lists/previous-lists.component';
import { ListDetailComponent } from './views/previous-lists/list-detail/list-detail.component';
import { ItemDaoService } from './services/item-dao.service';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { ZippyComponent } from './common/zippy/zippy.component';
import { AppRoutingModule } from './modules/routing/app.routing.module';
import { ShoppingListsService } from './services/shopping-lists.service';
import { SignupComponent } from './views/signup/signup.component';

@NgModule({
  imports: [
    BrowserModule,
    ShoppingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'shopping-list-app2018')
  ], 
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PreviousListsComponent,
    ListDetailComponent,
    ZippyComponent,
    SignupComponent
    
  ],
  providers: [
    ItemService,
    ItemDaoService,
    AngularFireDatabaseModule,
    AngularFireDatabase,
    ShoppingListsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

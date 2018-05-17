import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { ShoppingModule } from './views/shopping/shopping.module';
import { ItemService } from './services/item/item.service';
import { NgElseDirective } from "./shared/ng-else.directive";
import { LoginComponent } from './views/login/login.component';
import { routing } from './app.routing';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PreviousListsComponent } from './views/previous-lists/previous-lists.component';
import { ListDetailComponent } from './views/previous-lists/list-detail/list-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    ShoppingModule,
    FormsModule,
    routing
  ], 
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PreviousListsComponent,
    ListDetailComponent
  ],
  providers: [
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./views/login/login.component";
import { ShoppingViewComponent } from "./views/shopping/shopping-view/shopping-view.component";
import { ModuleWithProviders } from "@angular/core";
import { PreviousListsComponent } from "./views/previous-lists/previous-lists.component";
import { ListDetailComponent } from "./views/previous-lists/list-detail/list-detail.component";

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'previous-lists', component: PreviousListsComponent },
    { path: 'previous-list/:id', component: ListDetailComponent },
    { path: '', component: ShoppingViewComponent}
]

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
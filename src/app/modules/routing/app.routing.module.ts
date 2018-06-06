import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "../../views/login/login.component";
import { PreviousListsComponent } from "../../views/previous-lists/previous-lists.component";
import { ListDetailComponent } from "../../views/previous-lists/list-detail/list-detail.component";
import { ShoppingViewComponent } from "../../views/shopping/shopping-view/shopping-view.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'previous-lists', component: PreviousListsComponent },
    { path: 'previous-list/:id/:username', component: ListDetailComponent },
    { path: '', component: ShoppingViewComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
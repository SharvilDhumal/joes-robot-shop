import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {Routes} from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { CatalogComponent} from '../Components/catalog/catalog.component';
import { CartComponent} from '../Components/cart/cart.component';

const routes: Routes = [
  { path : 'home', component: HomeComponent , title : "Home - Joe's Robot Shop"},
  { path : 'catalog', component: CatalogComponent , title : "Catalog - Joe's Robot Shop"},
  { path : 'cart', component: CartComponent , title : "Cart - Joe's Robot Shop"},
  {path : '', redirectTo : '/home', pathMatch : 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

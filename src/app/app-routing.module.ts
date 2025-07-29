import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { CatalogComponent } from '../Components/catalog/catalog.component';
import { CartComponent } from '../Components/cart/cart.component';
import { SignInComponent } from '../Components/user/sign-in/sign-in.component';
import { TemplateFormControlsComponent } from '../Components/user/template-form-controls/template-form-controls.component';
import { RegisterComponent } from '../Components/user/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: "Home - Joe's Robot Shop" },
  {
    path: 'catalog',
    component: CatalogComponent,
    title: "Catalog - Joe's Robot Shop",
  },
  { path: 'cart', component: CartComponent, title: "Cart - Joe's Robot Shop" },
  {
    path: 'sign-in',
    component: SignInComponent,
    title: "Sign In - Joe's Robot Shop",
  },
  {
    path: 'template-form-controls',
    component: TemplateFormControlsComponent,
    title: "Template Form Controls - Joe's Robot Shop",
  },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

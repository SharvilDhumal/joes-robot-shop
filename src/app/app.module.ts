import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from '../Components/home/home.component';
import { CatalogComponent } from '../Components/catalog/catalog.component';
import { SiteHeaderComponent } from '../Components/site-header/site-header.component';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';
import { AddToCartDialogComponent } from '../Components/add-to-cart-dialog/add-to-cart-dialog.component';
import { CartComponent } from '../Components/cart/cart.component';
import { SignInComponent } from '../Components/user/sign-in/sign-in.component';
import { TemplateFormControlsComponent } from '../Components/user/template-form-controls/template-form-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogComponent,
    SiteHeaderComponent,
    ProductDetailsComponent,
    AddToCartDialogComponent,
    CartComponent,
    SignInComponent,
    TemplateFormControlsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    AppRoutingModule
  ],
  providers: [
    CurrencyPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

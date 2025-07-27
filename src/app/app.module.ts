import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../Components/home/home.component';
import { CatalogComponent } from '../Components/catalog/catalog.component';
import { SiteHeaderComponent } from '../Components/site-header/site-header.component';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddToCartDialogComponent } from '../Components/add-to-cart-dialog/add-to-cart-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from '../Components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogComponent,
    SiteHeaderComponent,
    ProductDetailsComponent,
    AddToCartDialogComponent,
    CartComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    MatDialogModule, 
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

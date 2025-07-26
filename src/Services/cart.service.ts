import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from '@components/catalog/product.module';
import { AddToCartDialogComponent } from '../Components/add-to-cart-dialog/add-to-cart-dialog.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cart: IProduct[] = [];
  
  constructor(private dialog: MatDialog, private http: HttpClient) { }

  add(product: IProduct): void {
    // Add to cart immediately
    this.cart.push(product);
    this.http.post('api/cart', this.cart).subscribe(() => {
      console.log(`Product ${product.name} added to cart!`);
    })
    
    // Show success message
    const dialogRef = this.dialog.open(AddToCartDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      disableClose: false,
      data: { 
        name: product.name,
        price: product.price,
        isSuccess: true
      }
    });
  }
}

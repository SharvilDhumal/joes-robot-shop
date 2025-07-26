import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from '@components/catalog/product.module';
import { AddToCartDialogComponent } from '../Components/add-to-cart-dialog/add-to-cart-dialog.component';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  constructor(private dialog: MatDialog, private http: HttpClient) {
    this.http.get<IProduct[]>('/api/cart').subscribe({
      next: (cart) => this.cart.next(cart),
    });
  }

  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable();
  }

  add(product: IProduct): void {
    // Create new array with the new product
    const currentCart = this.cart.getValue();
    const newCart = [...currentCart, product];
    
    // Update local state
    this.cart.next(newCart);
    
    // Update server
    this.http.post('api/cart', newCart).subscribe(() => {
      console.log(`Product ${product.name} added to cart!`);
      
      // Show success message
      this.dialog.open(AddToCartDialogComponent, {
        width: '350px',
        hasBackdrop: true,
        disableClose: false,
        data: { 
          name: product.name,
          price: product.price,
          isSuccess: true
        }
      });
    });
  }

  remove(product: IProduct): void {
    const currentCart = this.cart.getValue();
    const newCart = currentCart.filter((item) => item !== product);
    
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('Removed ' + product.name + ' from cart!');
    });
  }
}
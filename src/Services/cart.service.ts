import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from '@components/catalog/product.module';
import { AddToCartDialogComponent } from '../Components/add-to-cart-dialog/add-to-cart-dialog.component';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  constructor(
    private dialog: MatDialog, 
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.http.get<IProduct[]>('/api/cart').subscribe({
      next: (cart) => this.cart.next(cart),
    });
  }

  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable();
  }

  add(product: IProduct): Observable<boolean> {
    // Check if user is logged in
    if (!this.userService.getCurrentUser()) {
      // Show snackbar with sign-in prompt
      this.snackBar.open('Please sign in to add items to cart', 'Sign In', {
        duration: 3000
      }).onAction().subscribe(() => {
        this.router.navigate(['/sign-in']);
      });
      return of(false);
    }

    // Create new array with the new product
    const currentCart = this.cart.getValue();
    const newCart = [...currentCart, product];
    
    // Update local state
    this.cart.next(newCart);
    
    // Update server
    this.http.post('api/cart', newCart).subscribe({
      next: () => {
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
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this.snackBar.open('Failed to add item to cart', 'OK', {
          duration: 3000
        });
      }
    });
    return of(true);
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
import { Injectable } from '@angular/core';
import { IProduct } from '@components/catalog/product.module';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cart: IProduct[] = [];
  
  constructor() { }

  addToCart(product : IProduct){
    this.cart.push(product);
    console.log(`product ${product.name} added to cart!`);
  }
}

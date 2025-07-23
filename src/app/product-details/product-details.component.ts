import { Component, Input } from '@angular/core';
import { IProduct } from '../catalog/product.module';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product!: IProduct; // Add definite assignment assertion
  
  getImageUrl(product: IProduct) {
    if (!product) {
      return ' ';
    }
    return '/assets/images/robot-parts/' + product.imageName;
  }

  getDiscountedClasses(product: IProduct) {
    if (product.discount > 0) return ['strikeThrough'];         
    else return [];
  }

  addToCart(product: IProduct) {
    // Implementation for adding to cart
    console.log('Adding to cart:', product);

  }
}



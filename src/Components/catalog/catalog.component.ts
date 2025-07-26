import { Component, inject } from '@angular/core';
import { IProduct } from './product.module';
import { CartService } from '../../Services/cart.service';
import { ProductService} from '../../Services/product.service';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  // styles  : ['a {font-weight : bold;}'],
})
export class CatalogComponent {
  products: any;
  filter: string = '';
  // private cartSvc : CartService = inject(CartService);

  // Constructor Dependency Injection-->
  constructor(
    private cartSvc : CartService, private productSvc : ProductService
    ) {}

  ngOnInit(){
    this.productSvc.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product : IProduct){
    this.cartSvc.add(product);
  }


  getDiscountedClasses(product :IProduct){
      if(product.discount > 0) return ['strikeThrough'];         
    else return [];
  }


  getFilterProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter(
          (product: any) => product.category === this.filter
        );
  }
}

import { Component, inject } from '@angular/core';
import { IProduct } from './product.module';
import { CartService } from '../../Services/cart.service';
import { ProductService} from '../../Services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  // styles  : ['a {font-weight : bold;}'],
})
export class CatalogComponent {
  products: IProduct[] = [];
  filter: string = '';
  // private cartSvc : CartService = inject(CartService);

  // Constructor Dependency Injection-->
  constructor(
    private cartSvc : CartService,
    private productSvc : ProductService,
    private router : Router,
    private route : ActivatedRoute,
    ) {}

  ngOnInit(){
    this.productSvc.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    })
  }

  addToCart(product : IProduct){
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }


  getDiscountedClasses(product :IProduct){
      if(product.discount > 0) return ['strikeThrough'];         
    else return [];
  }


  getFilterProducts() {
    if (!this.products || !Array.isArray(this.products)) {
      return [];
    }
    return this.filter === ''
      ? this.products
      : this.products.filter(
          (product: IProduct) => product.category === this.filter
        );
  }
}

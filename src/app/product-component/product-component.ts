import { Component } from '@angular/core';
import { Product } from '../apiServices/product';

@Component({
  selector: 'app-product-component',
  imports: [],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})
export class ProductComponent {
 
  // apiDetail : any; 
  // ngOnInit(){
  //   this.productService.getApiData().subscribe((data : any)=>{
  //     console.log(data.products);
  //     this.apiDetail = data.products;
  //   });

  // }
}

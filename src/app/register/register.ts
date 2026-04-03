import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
 

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

 productData : {
    id: number;
    name: string;
    age: number;
    email: string;
}[] | undefined;

//  constructor(private productService:Product){

//  }


// getProductData(){
// this.productData = this.productService.getProductData();
// console.log(this.productData);

}

  // user = [
  //   {
  //     id : 1,
  //     name : "Waleed",
  //     age : 34,
  //     Email : "mail@123gmail.com"

  //   },
  //    {
  //     id: 2,
  //     name : "Tony",
  //     age : 24,
  //     email : "mail@123gmail.com"
  //   }
  // ]

 

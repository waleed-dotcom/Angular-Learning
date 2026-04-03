import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  count = 0
  handleclick(val: string) {
    console.log("fa");
    // if (val == "plus") {
    //   this.count = this.count + 1;
    // } else if (val == "minus") {
    //   this.count = this.count - 1;
    //   if (this.count < 0) {
    //     this.count = 0;
    //   }
    // } else {
    //   this.count = 0;
    // }

    switch(val){
      case "plus":
        this.count = this.count + 1;
        break;
      
      case "minus":
         this.count = this.count - 1;
        if (this.count < 0) {
          this.count = 0;
        }
        break;
        
      default:
      this.count = 0;
      break;
    }
    
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-loop-component',
  imports: [],
  templateUrl: './loop-component.html',
  styleUrl: './loop-component.css',
})
export class LoopComponent {
  class = ["Eng","Urdu","Math"]
  user = [
    {
      name : "Waleed",
      age : 34,
      Email : "mail@123gmail.com"

    },
     {
      name : "Tony",
      age : 24,
      email : "mail@123gmail.com"
    }

]

getobjectId(event : string){
  console.log(event)
}
}

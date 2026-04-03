import { Component } from '@angular/core';

@Component({
  selector: 'app-getset-input-value',
  imports: [],
  templateUrl: './getset-input-value.html',
  styleUrl: './getset-input-value.css',
})
export class GetsetInputValue {
  SetValue :string = ""; 
  email :string = ""; 
  ValueFromInput(event:Event){
   this.SetValue = (event.target as HTMLInputElement).value;
  }

   SetFromInput(event:Event){
   this.SetValue = "Mu";
  }

  getEmail(event:string){
  this.email = event
  }
setEmail(){
  this.email = "FW1122@FASD"
  }
  
}

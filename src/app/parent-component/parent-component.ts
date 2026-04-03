import { Component } from '@angular/core';
import { ChildComponent } from '../child-component/child-component';
import { CurrencyConverterPipe } from '../pipe/currency-converter-pipe';

@Component({
  selector: 'app-parent-component',
  imports: [ChildComponent, CurrencyConverterPipe],
  templateUrl: './parent-component.html',
  styleUrl: './parent-component.css',
})
export class ParentComponent {
//  userName : undefined|string[];

//   onchangeVal(val:string){
// this.userName = val;
//   }

//     onhandleVal(val:string[]){
//  console.log(val);
//  this.userName = val;
//   }
amount = 10; 
}

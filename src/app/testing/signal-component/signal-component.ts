import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signal-component',
  imports: [],
  templateUrl: './signal-component.html',
  styleUrl: './signal-component.css',
})
export class SignalComponent {

  count = signal(10);

  constructor(){ effect(()=>{
    console.log(this.count());
  })}

updateValue(val : string){

 switch(val){
case "inc" :
 this.count.set(this.count() + 1);
break;
case "dec":
   this.count.set(this.count() - 1);
 }
    
}

x= signal(20);
y = signal(10);
z= computed(()=> this.x() + this.y())

updateSignalValue(){
  console.log(this.z())
  this.x.set(100)
}
}

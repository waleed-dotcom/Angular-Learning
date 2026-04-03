import { Component } from '@angular/core';

@Component({
  selector: 'app-if-else-component',
  imports: [],
  templateUrl: './if-else-component.html',
  styleUrl: './if-else-component.css',
})
export class IfElseComponent {

  displayValue = false;

  toggleFunction(){
    this.displayValue = !this.displayValue
  }
}

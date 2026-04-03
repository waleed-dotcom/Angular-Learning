import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child-component',
  imports: [],
  templateUrl: './child-component.html',
  styleUrl: './child-component.css',
})
export class ChildComponent {
  // @Input() user:string = '';

  @Output() getUser = new EventEmitter();
  user = ["Waleed","ali","zaid"]

  ngOnInit(){
    this.getUser.emit(this.user)
  }
}

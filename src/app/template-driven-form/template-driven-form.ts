import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.css',
})
export class TemplateDrivenForm {

  userDetail : any;
  submit(val:NgForm){
    console.log(val);
this.userDetail = val;
  }
}

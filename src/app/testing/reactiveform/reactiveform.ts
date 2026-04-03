import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactiveform',
  imports: [ReactiveFormsModule],
  templateUrl: './reactiveform.html',
  styleUrl: './reactiveform.css',
})
export class Reactiveform {
  // name = new FormControl();
  // password = new FormControl();

displayName : string = "";
displayPass : string = "";  
displayAge : number = 0;  


profileGroup = new FormGroup({
  name : new FormControl('',[Validators.required]),
  password : new FormControl('',[Validators.required, Validators.minLength(5)]),
  age : new FormControl('',[Validators.required])
})

  Submitbtn(){
    console.log(this.profileGroup.value );
// this.displayName =this.profileGroup.value.name;
// this.displayPass =this.profileGroup.value.password;
// this.displayAge =this.profileGroup.value.age;



    
  }
  get name(){
    return this.profileGroup.get('name');
  }
    get password(){
    return this.profileGroup.get('password');
  }
    get age(){
    return this.profileGroup.get('age');
  }
}

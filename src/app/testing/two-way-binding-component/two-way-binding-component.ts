
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way-binding-component',
  imports: [FormsModule],
  templateUrl: './two-way-binding-component.html',
  styleUrl: './two-way-binding-component.css',
})
export class TwoWayBindingComponent {

  task = "";
  tasklist : {id:number, name:string}[]=[];
  
  addTask(){
    this.tasklist.push({id : this.tasklist.length + 1 , name: this.task})
    this.task = ""
  }

  deleteTask(id : number){
   this.tasklist = this.tasklist.filter((item) => item.id != id )

  }

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

}

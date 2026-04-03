import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestingModule } from './testing/testing-module';
import { HeaderComponent } from './header-component/header-component';
import { TemplateDrivenForm } from './template-driven-form/template-driven-form';
import { ParentComponent } from './parent-component/parent-component';
import { Register } from './register/register';
import { ProductComponent } from './product-component/product-component';
import { Category } from './category/category';
import { AddCategoryComponent } from './add-category-component/add-category-component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TestingModule,
    HeaderComponent,TemplateDrivenForm,
    ParentComponent,Register,
    ProductComponent,
    Category,
  AddCategoryComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  

}

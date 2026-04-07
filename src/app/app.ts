import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestingModule } from './testing/testing-module';
import { HeaderComponent } from './header-component/header-component';
import { TemplateDrivenForm } from './template-driven-form/template-driven-form';
import { ParentComponent } from './parent-component/parent-component';
import { Register } from './register/register';
import { ProductComponent } from './product-component/product-component';
import { Category } from './parent-child-task/category/category';
import { AddCategoryComponent } from './parent-child-task/add-category-component/add-category-component';
import { ParentChildTaskModule } from './parent-child-task/parent-child-task-module';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './dialog-component/dialog-component';
import { Product } from './apiServices/product';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TestingModule,
    HeaderComponent,
    TemplateDrivenForm,
    ParentComponent,
    Register,
    ProductComponent,
    ParentChildTaskModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(
    private dialog: MatDialog,
    private productService: Product,
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'User Information',
        name: 'Ali',
        age: 25,
      },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      this.productService.getCategories().subscribe((data) => {
        console.log(data);
      });
    });
  }
}

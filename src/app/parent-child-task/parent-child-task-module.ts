import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from './category/category';
import { AddCategoryComponent } from './add-category-component/add-category-component';

@NgModule({
  declarations: [],
  imports: [CommonModule,Category,AddCategoryComponent],
  exports: [Category,AddCategoryComponent]
})
export class ParentChildTaskModule {}

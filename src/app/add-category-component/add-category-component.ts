import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../apiServices/product';

@Component({
  selector: 'app-add-category-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-category-component.html',
  styleUrl: './add-category-component.css',
})
export class AddCategoryComponent {

  parentCategory: any[] = [];

  categoryForm = {
    parentCategoryId: null,
    name: '',
    code: '',
    description: ''
  };

  submitted = false;
  showModal = false;
  isEditMode = false;
  editCategoryId: number | null = null;
  constructor(private productService: Product , private cd: ChangeDetectorRef) { }

  openModal(category: any = null): void {
    this.showModal = true;
    this.getParentCategory();

 if (category) {
    console.log(category);

    this.isEditMode = true;
    this.editCategoryId = category.categoryId;

    const selectedParent = this.parentCategory.find(
      x => x.categoryId === category.parentId
    );

    this.categoryForm = {
      parentCategoryId: selectedParent?.categoryId ?? null,
      name: category.name ?? '',
      code: category.code ?? '',
      description: category.descriptions ?? ''
    };

  } else {
    this.isEditMode = false;
    this.editCategoryId = null;
    this.resetForm();
  }
     
  }

  


 

  getParentCategory(): void {
    this.productService.getParentCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.parentCategory = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }

 closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.categoryForm = {
      parentCategoryId: null,
      name: '',
      code: '',
      description: ''
    };

    this.submitted = false;
    this.isEditMode = false;
    this.editCategoryId = null;
  }


  saveCategory(): void {
    this.submitted = true;

    if (
      !this.categoryForm.name ||
      !this.categoryForm.code ||
      !this.categoryForm.description
    ) {
      return;
    }

    const payload = {
      CategoryId: this.isEditMode ? this.editCategoryId : 0,
      Name: this.categoryForm.name,
      Code: this.categoryForm.code,
      Descriptions: this.categoryForm.description,
      ParentId: this.categoryForm.parentCategoryId ?? -1,
    };

    if (this.isEditMode) {
      this.productService.updateCategory(payload).subscribe({
        next: (response) => {
          console.log('Updated Successfully', response);

          this.productService.notifyCategoryAdded();
          this.closeModal();
        },
        error: (error) => {
          console.error('Update Error', error);
        }
      });
    } else {
      this.productService.addCategory(payload).subscribe({
        next: (response) => {
          console.log('Saved Successfully', response);

          this.productService.notifyCategoryAdded();
          this.closeModal();
        },
        error: (error) => {
          console.error('Save Error', error);
        }
      });
    }
  }
}
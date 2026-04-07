import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../../apiServices/product';
import { ToastrService } from 'ngx-toastr';

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
    description: '',
  };

  submitted = false;
  showModal = false;
  isEditMode = false;
  editCategoryId: number | null = null;
  showParentCategory = false;
  validationNameMessage: string = '';
  validationCodeMessage: string = '';
  validationDescMessage: string = '';

  constructor(
    private productService: Product,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
  ) {}
@ViewChild('categoryFormRef') categoryFormRef!: NgForm;
  openModal(category: any = null, isAddChild: boolean = false): void {
    this.showModal = true;
    this.showParentCategory = true;

    this.getParentCategory(category, isAddChild);

    if (category && !isAddChild) {
      this.isEditMode = true;
      this.editCategoryId = category.categoryId;
      if (category.parentId === -1) {
        this.showParentCategory = false;
      }
      this.categoryForm = {
        parentCategoryId: category ? (category.parentId === -1 ? -1 : category.parentId) : null,
        name: category.name ?? '',
        code: category.code ?? '',
        description: category.descriptions ?? '',
      };
    } else {
      this.isEditMode = false;
      this.editCategoryId = null;

      this.categoryForm = {
        parentCategoryId: category
          ? category.parentId === -1
            ? category.categoryId
            : category.parentId
          : null,
        name: '',
        code: '',
        description: '',
      };
    }
  }

  openRootModal(): void {
       this.resetForm();
    this.showModal = true;
    this.isEditMode = false;
    this.editCategoryId = null;
 
    this.showParentCategory = false;
  }

  getParentCategory(category: any = null, isAddChild: boolean = false): void {
    this.productService.getParentCategories(category?.categoryId ?? 0).subscribe({
      next: (data) => {
        this.parentCategory = [];
        this.parentCategory = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('API Error:', error);
      },
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
      description: '',
    };

    this.submitted = false;
    this.isEditMode = false;
    this.editCategoryId = null;
    this.validationCodeMessage = '';
    this.validationNameMessage = '';
    this.validationDescMessage = '';

    if (this.categoryFormRef) {
    this.categoryFormRef.resetForm({
      parentCategoryId: null,
      name: '',
      code: '',
      description: '',
    });
  }
  }

  saveCategory(form: NgForm) {
 
    this.submitted = true;

    if (form.invalid) {
      Object.keys(form.controls).forEach((field) => {
        form.controls[field].markAsTouched();
      });
      return;
    }

    const payload = {
      CategoryId: this.isEditMode ? this.editCategoryId : 0,
      Name: this.categoryForm.name,
      Code: this.categoryForm.code,
      Descriptions: this.categoryForm.description,
      ParentId: this.categoryForm.parentCategoryId ?? -1,
    };

    console.log(payload);

    if (this.isEditMode) {
      this.productService.updateCategory(payload).subscribe({
        next: (response) => {

           if (response.success) {
            console.log(response.message);
            
          this.productService.notifyCategoryAdded();
          this.closeModal();
          }else{
            this.validationCodeMessage = response.message;
                this.cd.detectChanges();
          }
         
        },
        error: (error) => {
          
          console.error('Update Error', error);
        },
      });
    } else {
      this.productService.addCategory(payload).subscribe({
        next: (response) => {
           console.log(response);
          if (response.success) {
            console.log(response.message);
            this.productService.notifyCategoryAdded();
            this.closeModal();
          }else{
              this.validationCodeMessage = response.message;
                  this.cd.detectChanges();
          }
        },
        error: (error) => {
          console.error('Save Error', error);
        },
      });
    }
  }
}

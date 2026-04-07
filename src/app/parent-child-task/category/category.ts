import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../apiServices/product';
import { AddCategoryComponent } from '../add-category-component/add-category-component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, AddCategoryComponent],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {

  categories: any[] = [];
  expandedRows: { [key: number]: boolean } = {};
  searchText: string = '';
  filteredCategories: any[] = [];

  currentPage: number = 1;
  pageSize: number = 5;
  constructor(
    private productService: Product,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.currentPage = 1;
    this.getCategories();

    this.productService.categoryAdded.subscribe(() => {
      this.getCategories();
    });
  }

  @ViewChild(AddCategoryComponent)
  addCategoryComponent!: AddCategoryComponent;

 

  editCategory(category: any) {
    if (this.addCategoryComponent) {
      this.addCategoryComponent.openModal(category);
    }
  }

 AddCategoryFromRows(category: any = null) {
  if (this.addCategoryComponent) {
    this.addCategoryComponent.openModal(category, true);
  }
}

  

  getCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = [...data];
        this.filteredCategories = [...data];
        this.cd.detectChanges();
 
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }

  toggleRow(categoryId: number): void {
  this.expandedRows[categoryId] = !this.expandedRows[categoryId];
}
 
  deleteCategory(categoryId: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete this category?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.productService.deleteCategory(categoryId).subscribe({
        next: (response) => {
          console.log('Deleted Successfully', response);

          Swal.fire({
            title: 'Deleted!',
            text: 'Category deleted successfully.',
            icon: 'success'
          });

          this.productService.notifyCategoryAdded();
          this.cd.detectChanges();
        },
        error: (error) => {
          console.error('Delete Error', error);

          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while deleting category.',
            icon: 'error'
          });
        }
      });
    }
  });
}

  searchCategory(): void {
    const text = this.searchText.toLowerCase().trim();

    this.filteredCategories = this.categories.filter(category => {
      const parentMatch =
        category.name?.toLowerCase().includes(text) ||
        category.code?.toLowerCase().includes(text) ||
        category.descriptions?.toLowerCase().includes(text);

      const childMatch = category.children?.some((child: any) =>
        child.name?.toLowerCase().includes(text) ||
        child.code?.toLowerCase().includes(text) ||
        child.descriptions?.toLowerCase().includes(text)
      );

      return parentMatch || childMatch;
    });

    this.currentPage = 1;
  }

  get paginatedCategories(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredCategories.slice(startIndex, startIndex + this.pageSize);
  }
  get totalPages(): number {
    if (!this.filteredCategories || this.filteredCategories.length === 0) {
      return 1;
    }

    return Math.ceil(this.filteredCategories.length / this.pageSize);
  }

  nextPage(): void {
    console.log(this.totalPages);
    console.log(this.currentPage);

    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onPageSizeChange(value: number): void {
  this.pageSize = Number(value);
  this.currentPage = 1;
}
}
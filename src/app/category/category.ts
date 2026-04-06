import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../apiServices/product';
import { AddCategoryComponent } from '../add-category-component/add-category-component';
import { FormsModule } from '@angular/forms';

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
    this.getCategories();

    this.productService.categoryAdded.subscribe(() => {
      this.getCategories();
    });
  }

  @ViewChild(AddCategoryComponent)
  addCategoryComponent!: AddCategoryComponent;

  // ngAfterViewInit(): void {
  //   console.log(this.addCategoryComponent);
  // }

  editCategory(category: any) {
    if (this.addCategoryComponent) {
      this.addCategoryComponent.openModal(category);
    }
  }

  AddCategoryFromRows() {
    if (this.addCategoryComponent) {
      this.addCategoryComponent.openModal();
    }
  }

  

  getCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = [...data];
        this.filteredCategories = [...data];
        console.log(this.filteredCategories);
        this.cd.detectChanges();

        this.currentPage = 1;
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
    console.log(categoryId);
    this.productService.deleteCategory(categoryId).subscribe({
      next: (response) => {
        console.log('Deleted Successfully', response);
        alert("Category Deleted")
        this.productService.notifyCategoryAdded();
            this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Delete Error', error);
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
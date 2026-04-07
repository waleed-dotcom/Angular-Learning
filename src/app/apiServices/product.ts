import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private apiUrl = 'https://localhost:7006/api/Categories';

  private categoryAddedSource = new Subject<void>();
  categoryAdded = this.categoryAddedSource.asObservable();

  constructor(private http: HttpClient) {}

  getParentCategories(categoryId: number = 0) {
    return this.http.get<any[]>(`${this.apiUrl}/GetParentCategories?categoryId=${categoryId}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetCategoriesWithSubCategory`);
  }

  addCategory(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddCategory`, payload);
  }

  updateCategory(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/UpdateCategory`, payload);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteCategory?categoryId=${categoryId}`);
  }

  notifyCategoryAdded(): void {
    this.categoryAddedSource.next();
  }
}

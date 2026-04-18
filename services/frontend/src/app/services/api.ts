import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Category endpoints
  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, category);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }

  // Transaction endpoints
  addTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/transactions`, transaction);
  }

  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transactions`);
  }

  getTransactionById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/transactions/${id}`);
  }

  updateTransaction(id: number, transaction: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/transactions/${id}`, transaction);
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/transactions/${id}`);
  }

  getSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/transactions/summary`);
  }
}

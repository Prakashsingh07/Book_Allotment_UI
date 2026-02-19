import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://localhost:7278/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getUserCount() {
    return this.http.get<number>(
      `${this.apiUrl}/users/count`,
      this.getAuthHeaders()
    );
  }

  getBookCount() {
    return this.http.get<number>(
      `${this.apiUrl}/books/count`,
      this.getAuthHeaders()
    );
  }

  getPendingCount() {
    return this.http.get<number>(
      `${this.apiUrl}/requests/pending/count`,
      this.getAuthHeaders()
    );
  }
}
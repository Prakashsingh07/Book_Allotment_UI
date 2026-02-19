import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'https://localhost:7278/api/requests';

  constructor(private http: HttpClient) {}

  requestBook(bookId: number) {
    return this.http.post(`${this.baseUrl}/${bookId}`, {});
  }

  getPending() {
    return this.http.get<any[]>(`${this.baseUrl}/pending`);
  }

  approve(requestId: number) {
    return this.http.post(`${this.baseUrl}/approve/${requestId}`, {});
  }
}
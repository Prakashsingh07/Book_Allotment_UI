import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://localhost:7278/api/admin/users';

  constructor(private http: HttpClient) {}

  // ✅ Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // ✅ Get user by id
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // ✅ Add user  -> POST /api/admin/users/users
 addUser(user: any) {
  return this.http.post(this.baseUrl, user);
}

  // ✅ Update user -> PUT /api/admin/users/users/{id}
  updateUser(id: number, user: any) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  // ✅ Delete user -> DELETE /api/admin/users/{id}
  // ❗ Notice: NO /users here
  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
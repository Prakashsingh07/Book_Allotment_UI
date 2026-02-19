import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <nav class="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

    <!-- Logo -->
    <div class="text-xl font-bold cursor-pointer"
         routerLink="/">
      📚 Book Allotment
    </div>

    <!-- Right Side -->
    <div class="space-x-6 flex items-center">

      <!-- If NOT Logged In -->
      <ng-container *ngIf="!isLoggedIn(); else loggedInBlock">
        <a routerLink="/login" class="hover:text-gray-300">Login</a>
        <a routerLink="/register" class="hover:text-gray-300">Register</a>
      </ng-container>

      <!-- If Logged In -->
      <ng-template #loggedInBlock>

        <!-- Admin Links -->
        <ng-container *ngIf="role() === 'Admin'">
          <a routerLink="/admin/dashboard" class="hover:text-gray-300">Dashboard</a>
          <a routerLink="/admin/users" class="hover:text-gray-300">Users</a>
          <a routerLink="/admin/books" class="hover:text-gray-300">Books</a>
          <a routerLink="/admin/logs" class="hover:text-gray-300">Logs</a>
          <a routerLink="/admin/pending-requests">Pending Requests</a>
        </ng-container>

        <!-- User Links -->
        <ng-container *ngIf="role() === 'User'">
          <a routerLink="/user/dashboard" class="hover:text-gray-300">Dashboard</a>
          <a routerLink="/user/my-books" class="hover:text-gray-300">My Books</a>
        </ng-container>

        <button (click)="logout()"
          class="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
          Logout
        </button>

      </ng-template>

    </div>
  </nav>
  `
})
export class NavbarComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  role() {
    return this.auth.getRole();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
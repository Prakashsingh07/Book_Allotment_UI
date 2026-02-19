import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="min-h-screen bg-gray-100 p-8">

    <!-- Header -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 
                text-white p-8 rounded-2xl shadow-lg mb-8">
      <h1 class="text-3xl font-bold">Admin Dashboard</h1>
      <p class="mt-2 text-indigo-100">
        Welcome Admin 👋 Manage your system efficiently.
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <!-- Total Users -->
      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl 
                  transition duration-300">
        <h2 class="text-lg font-semibold text-gray-700">Total User</h2>

        <p *ngIf="loading" class="text-gray-400 mt-2">Loading...</p>
        <p *ngIf="!loading"
           class="text-3xl font-bold text-indigo-600 mt-2">
          {{ userCount }}
        </p>
      </div>

      <!-- Total Books -->
      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl 
                  transition duration-300">
        <h2 class="text-lg font-semibold text-gray-700">Total Books</h2>

        <p *ngIf="loading" class="text-gray-400 mt-2">Loading...</p>
        <p *ngIf="!loading"
           class="text-3xl font-bold text-purple-600 mt-2">
          {{ bookCount }}
        </p>
      </div>

      <!-- Pending Requests -->
      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl 
                  transition duration-300">
        <h2 class="text-lg font-semibold text-gray-700">
          Pending Requests
        </h2>

        <p *ngIf="loading" class="text-gray-400 mt-2">Loading...</p>
        <p *ngIf="!loading"
           class="text-3xl font-bold text-red-500 mt-2">
          {{ pendingCount }}
        </p>
      </div>

    </div>

    <!-- Error Message -->
    <div *ngIf="error"
         class="mt-6 bg-red-100 text-red-700 p-4 rounded-xl">
      {{ error }}
    </div>

  </div>
  `
})
export class AdminDashboardComponent implements OnInit {

  userCount: number = 0;
  bookCount: number = 0;
  pendingCount: number = 0;

  loading = true;
  error: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;

    this.adminService.getUserCount().subscribe({
      next: (res) => this.userCount = res,
      error: () => this.error = 'Failed to load user count'
    });

    this.adminService.getBookCount().subscribe({
      next: (res) => this.bookCount = res,
      error: () => this.error = 'Failed to load book count'
    });

    this.adminService.getPendingCount().subscribe({
      next: (res) => {
        this.pendingCount = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load pending requests';
        this.loading = false;
      }
    });
  }
}
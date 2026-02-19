import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../../core/services/log.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="p-6 min-h-screen bg-gray-100">

    <h2 class="text-3xl font-bold mb-6 text-gray-800">
      📚 Allotted Books
    </h2>

    <div *ngIf="logs.length === 0"
         class="text-gray-500">
      No allotted books found.
    </div>

    <div *ngFor="let log of logs"
         class="bg-white p-6 shadow rounded-xl mb-4 
                flex justify-between items-center">

      <div>
        <p class="font-semibold text-lg">
          {{log.bookTitle}}
        </p>

        <p class="text-gray-600">
          👤 {{log.userName}} ({{log.userEmail}})
        </p>

        <p class="text-sm text-gray-500">
          📅 {{log.allotDate | date:'medium'}}
        </p>

        <span class="px-3 py-1 text-sm rounded-full"
              [ngClass]="{
                'bg-green-100 text-green-700': log.status === 'Allotted',
                'bg-red-100 text-red-700': log.status === 'Revoked'
              }">
          {{log.status}}
        </span>
      </div>

      <!-- 🔥 Revoke Button -->
      <div *ngIf="log.status === 'Allotted'">
        <button
          (click)="revoke(log.id)"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition">
          Revoke
        </button>
      </div>

    </div>

  </div>
  `
})
export class LogsComponent implements OnInit {

  logs: any[] = [];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.logService.getAllLogs()
      .subscribe(res => this.logs = res);
  }

  revoke(id: number) {
    if(confirm('Are you sure you want to revoke this book?')) {
      this.logService.revokeBook(id)
        .subscribe(() => {
          this.loadLogs(); // refresh list
        });
    }
  }
}
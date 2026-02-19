import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../../core/services/log.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">My Books</h2>

    <div *ngFor="let log of logs"
      class="bg-white p-4 shadow rounded-lg mb-3">

      <p><strong>Book:</strong> {{log.bookTitle}}</p>
      <p><strong>Status:</strong> {{log.status}}</p>
    </div>
  </div>
  `
})
export class MyBooksComponent implements OnInit {

  logs: any[] = [];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logService.getMyLogs().subscribe(res => this.logs = res);
  }
}
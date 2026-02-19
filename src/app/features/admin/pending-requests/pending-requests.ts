import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../core/services/request.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Pending Requests</h2>

    <div *ngIf="requests.length === 0" class="text-gray-500">
      No pending requests.
    </div>

    <div *ngFor="let req of requests"
      class="bg-white p-4 shadow rounded mb-3 border-l-4 border-yellow-500">

      <p><strong>User ID:</strong> {{req.userId}}</p>
      <p><strong>Book ID:</strong> {{req.bookId}}</p>
      <p><strong>Status:</strong> {{req.status}}</p>

      <button 
        (click)="approve(req.id)"
        class="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
        Approve
      </button>
    </div>
  </div>
  `
})
export class PendingRequestsComponent implements OnInit {

  requests: any[] = [];

  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.requestService.getPending()
      .subscribe(res => this.requests = res);
  }

  approve(id: number) {
    this.requestService.approve(id)
      .subscribe(() => this.load());
  }
}
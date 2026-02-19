import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../core/services/book.service';
import { RequestService } from '../../../core/services/request.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Available Books</h2>

    <div *ngFor="let book of books"
      class="bg-white p-4 shadow rounded-lg mb-3">

      <h3 class="font-bold">{{book.title}}</h3>
      <p>{{book.author}}</p>

      <button (click)="request(book.id)"
        class="bg-blue-600 text-white px-3 py-1 rounded mt-2">
        Request
      </button>
    </div>
  </div>
  `
})
export class UserDashboardComponent implements OnInit {

  books: any[] = [];

  constructor(
    private bookService: BookService,
    private requestService: RequestService
  ) {}

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe(res => this.books = res);
  }

  request(bookId: number) {
    this.requestService.requestBook(bookId)
      .subscribe({
        next: () => alert("Request sent successfully!"),
        error: () => alert("Request failed")
      });
  }
}
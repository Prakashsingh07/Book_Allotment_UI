import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../core/services/book.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-10">

  <!-- Header Section -->
  <div class="mb-10 bg-white rounded-3xl shadow-xl p-8">
    <h2 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
               bg-clip-text text-transparent">
      Manage Books
    </h2>
    <p class="text-gray-500 mt-2 text-lg">
      Add, update and manage book inventory
    </p>
  </div>

  <!-- Add Book Card -->
  <div class="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-gray-100">
    <h3 class="text-xl font-semibold mb-6 text-gray-700">
      Add New Book
    </h3>

    <form #bookForm="ngForm">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

        <!-- Title -->
        <div>
          <input
            name="title"
            required
            [(ngModel)]="form.title"
            #title="ngModel"
            placeholder="Title"
            class="w-full px-4 py-3 rounded-xl border border-gray-300
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition outline-none"/>

          <p *ngIf="title.invalid && title.touched"
             class="text-red-500 text-sm mt-1">
            Title is required
          </p>
        </div>

        <!-- Author -->
        <div>
          <input
            name="author"
            required
            [(ngModel)]="form.author"
            #author="ngModel"
            placeholder="Author"
            class="w-full px-4 py-3 rounded-xl border border-gray-300
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition outline-none"/>

          <p *ngIf="author.invalid && author.touched"
             class="text-red-500 text-sm mt-1">
            Author is required
          </p>
        </div>

        <!-- Quantity -->
        <div>
          <input
            type="number"
            name="quantity"
            required
            min="1"
            [(ngModel)]="form.quantity"
            #quantity="ngModel"
            placeholder="Quantity"
            class="w-full px-4 py-3 rounded-xl border border-gray-300
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   transition outline-none"/>

          <p *ngIf="quantity.invalid && quantity.touched"
             class="text-red-500 text-sm mt-1">
            Quantity must be at least 1
          </p>
        </div>

        <!-- Add Button -->
        <div class="flex items-start">
          <button
            type="button"
            (click)="addBook()"
            [disabled]="bookForm.invalid"
            class="w-full py-3 rounded-xl text-white font-semibold
                   bg-gradient-to-r from-indigo-600 to-purple-600
                   hover:opacity-90 shadow-lg transition
                   disabled:opacity-50">
            Add Book
          </button>
        </div>

      </div>
    </form>
  </div>

  <!-- Books Table -->
  <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
    <table class="min-w-full">

      <!-- Table Header -->
      <thead class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <tr>
          <th class="px-8 py-4 text-left text-sm uppercase tracking-wider">Title</th>
          <th class="px-8 py-4 text-left text-sm uppercase tracking-wider">Author</th>
          <th class="px-8 py-4 text-left text-sm uppercase tracking-wider">Quantity</th>
          <th class="px-8 py-4 text-center text-sm uppercase tracking-wider">Actions</th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody class="divide-y divide-gray-200">

        <tr *ngFor="let book of books"
            class="hover:bg-indigo-50 transition duration-200">

          <!-- Title -->
          <td class="px-8 py-5">
            <input *ngIf="editId === book.id"
              [(ngModel)]="book.title"
              class="w-full px-3 py-2 border rounded-lg"/>
            <span *ngIf="editId !== book.id"
                  class="font-medium text-gray-700">
              {{book.title}}
            </span>
          </td>

          <!-- Author -->
          <td class="px-8 py-5 text-gray-600">
            <input *ngIf="editId === book.id"
              [(ngModel)]="book.author"
              class="w-full px-3 py-2 border rounded-lg"/>
            <span *ngIf="editId !== book.id">
              {{book.author}}
            </span>
          </td>

          <!-- Quantity -->
          <td class="px-8 py-5 text-gray-600">
            <input *ngIf="editId === book.id"
              type="number"
              [(ngModel)]="book.quantity"
              class="w-full px-3 py-2 border rounded-lg"/>
            <span *ngIf="editId !== book.id">
              {{book.quantity}}
            </span>
          </td>

          <!-- Actions -->
          <td class="px-8 py-5 text-center space-x-3">

            <button *ngIf="editId !== book.id"
              (click)="startEdit(book.id)"
              class="px-4 py-2 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 shadow transition">
              Edit
            </button>

            <button *ngIf="editId === book.id"
              (click)="updateBook(book)"
              class="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 shadow transition">
              Save
            </button>

            <button *ngIf="editId === book.id"
              (click)="cancelEdit()"
              class="px-4 py-2 rounded-lg text-white bg-gray-500 hover:bg-gray-600 shadow transition">
              Cancel
            </button>

            <button (click)="delete(book.id)"
              class="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 shadow transition">
              Delete
            </button>

          </td>
        </tr>

        <!-- Empty State -->
        <tr *ngIf="books.length === 0">
          <td colspan="4" class="text-center py-8 text-gray-500 text-lg">
            No books available
          </td>
        </tr>

      </tbody>
    </table>
  </div>

</div>
`
})
export class ManageBooksComponent implements OnInit {

  books: any[] = [];
  editId: number | null = null;

  form: any = {
    title: '',
    author: '',
    quantity: 1
  };

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks()
      .subscribe(res => this.books = res);
  }

  // Add Book with validation safety
  addBook() {
    if (!this.form.title || !this.form.author || this.form.quantity < 1) {
      return;
    }

    this.bookService.addBook(this.form)
      .subscribe(() => {
        this.form = { title: '', author: '', quantity: 1 };
        this.loadBooks();
      });
  }

  startEdit(id: number) {
    this.editId = id;
  }

  cancelEdit() {
    this.editId = null;
    this.loadBooks();
  }

  updateBook(book: any) {
    this.bookService.updateBook(book.id, book)
      .subscribe(() => {
        this.editId = null;
        this.loadBooks();
      });
  }

  delete(id: number) {
    this.bookService.deleteBook(id)
      .subscribe(() => {
        this.books = this.books.filter(b => b.id !== id);
      });
  }
}
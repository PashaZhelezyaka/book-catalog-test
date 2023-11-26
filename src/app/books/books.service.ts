import { Injectable } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { Author, Books } from "../interfaces/interface";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private updateDataSubject = new Subject<void>();
  updateBooks$ = this.updateDataSubject.asObservable();

  constructor() { }

  getBooks(): Observable<Books[] | null> {
    let authorsString = localStorage.getItem('books');
    return of(JSON.parse(authorsString));
  }

  saveAuthor(book: Books) {
    this.getBooks().subscribe(books => {
        let data: Books[] = books && books.length > 0 ? [...books, book] : [book];
        localStorage.setItem('books', JSON.stringify(data));
        this.updateBooks()
    });
  }

  updateBooks() {
    this.updateDataSubject.next();
  }
}

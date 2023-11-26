import { Injectable } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { Author } from "../interface";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private updateDataSubject = new Subject<void>();
  updateAuthors$ = this.updateDataSubject.asObservable();

  constructor() { }

  getAuthors(): Observable<Author[] | null> {
    let authorsString = localStorage.getItem('authors');
    return of(JSON.parse(authorsString));
  }

  saveAuthor(author: Author) {
    this.getAuthors().subscribe(authors => {
      let data: Author[] = authors && authors.length > 0 ? [...authors, author] : [author];
      localStorage.setItem('authors', JSON.stringify(data));
      this.updateAuthors()
    });
  }

  updateAuthors(): void {
    this.updateDataSubject.next();
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { Author } from "../interfaces/interface";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private updateDataSubject = new Subject<void>();
  updateAuthors$ = this.updateDataSubject.asObservable();
  private errorMessageSubject = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor() { }

  getAuthors(): Observable<Author[] | null> {
    let authorsString = localStorage.getItem('authors');
    return of(JSON.parse(authorsString));
  }

  saveAuthor(author: Author) {
    this.getAuthors().subscribe(authors => {
      const hasSameAuthorValid = this.authorVerification(authors, author)
      if(hasSameAuthorValid){
        this.errorMessageSubject.next("Такой автор уже существует")
      }
      else {
        this.errorMessageSubject.next('');
        let data: Author[] = authors && authors.length > 0 ? [...authors, author] : [author];
        localStorage.setItem('authors', JSON.stringify(data));
        this.updateAuthors()
      }
    });
  }

  updateAuthors() {
    this.updateDataSubject.next();
  }

  authorVerification(authors: Author[] | null, newAuthor: Author ): boolean {
    let hasSameAuthor = false
    if(authors && authors.length > 0){
      hasSameAuthor = authors.some(author =>
        author.surname === newAuthor.surname && author.date === newAuthor.date
      );
    }
   return hasSameAuthor
  }
}

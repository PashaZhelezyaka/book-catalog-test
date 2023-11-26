import { Component, OnInit } from '@angular/core';
import { Author, Books } from "../interface";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  tableData = {columns: [] as string[], rows: [] as any[]};
  books: Books[] = []

  constructor() { }

  ngOnInit(): void {
  }

  getBooks() {
   /* this.authorsService.getAuthors().subscribe(authors => {
      this.authors = authors
      if(authors && this.authors.length > 0) {
        this.sortAuthorsBySurname()
        this.setTableData(this.authors)
      }
    })*/
  }

}

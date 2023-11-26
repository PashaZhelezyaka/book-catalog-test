import { Component, OnInit } from '@angular/core';
import { AuthorsService } from "./authors.service";
import { Author } from "../interface";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  tableData = {columns: [] as string[], rows: [] as any[]};
  authors: Author[] = []

  constructor(private authorsService: AuthorsService) { }

  ngOnInit(): void {
    this.getAuthors()
    this.authorsService.updateAuthors$.subscribe(() => {
      this.getAuthors()
    })
  }

  getAuthors() {
    this.authorsService.getAuthors().subscribe(authors => {
      this.authors = authors
      if(authors && this.authors.length > 0) {
        this.sortAuthorsBySurname()
        this.setTableData(this.authors)
      }
    })
  }

  setTableData(data: any[]) {
    this.tableData.columns = ['Id', 'Фамилия', 'Имя', 'Отчество', 'Дата рождения']
    this.tableData.rows = data.map((item: any) => {
      return {
        id: item.id ?? '',
        cells: [
          item.id,
          item.surname,
          item.name ?? '',
          item.patronymic ?? '',
          item.date ?? '',
        ],
        data: item
      }
    })
  }

  sortAuthorsBySurname(): void {
    this.authors.sort((a: Author, b: Author) => {
      if(a.surname < b.surname) {
        return -1;
      }
      if(a.surname > b.surname) {
        return 1;
      }
      return 0;
    });
  }

}

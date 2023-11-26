import { Component, OnInit } from '@angular/core';
import { Books } from "../interfaces/interface";
import { BooksService } from "./books.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  tableData = {columns: [] as string[], rows: [] as any[]};
  books: Books[] = []
  sortColumnName: string = '';
  isAscending: boolean = true;

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.getBooks()
    this.booksService.updateBooks$.subscribe(() => {
      this.getBooks()
    })
  }

  getBooks() {
    this.booksService.getBooks().subscribe(books => {
      this.books = books
      if(books && this.books.length > 0) {
        this.setTableData(this.books)
      }
    })
  }

  setTableData(data: Books[]) {
    this.tableData.columns = ['Id', 'Автор', 'Название', 'Издательство', 'Год']
    this.tableData.rows = data.map((item: any) => {
      return {
        id: item.id,
        cells: [
          item.id,
          item.author,
          item.title,
          item.publisher,
          item.year,
        ],
        data: item
      }
    })
  }

  onHeadItemSort(columnName: string) {
    if(columnName === "Id") return;
    if(this.sortColumnName === columnName) {
      this.isAscending = !this.isAscending;
    }
    else {
      this.sortColumnName = columnName;
      this.isAscending = true;
    }

    this.sortRows();
  }

  sortRows() {
    const columnIndex = this.tableData.columns.indexOf(this.sortColumnName);
    const sortOrder = this.isAscending ? 1 : -1;

    if(columnIndex !== -1) {
      this.tableData.rows.sort((a, b) => {
        const cellA = a.cells[columnIndex];
        const cellB = b.cells[columnIndex];

        return this.compare(cellA, cellB) * sortOrder;
      });
    }
  }

  compare(a: any, b: any) {
    if(a < b) {
      return -1;
    }
    if(a > b) {
      return 1;
    }
    return 0;
  }


}

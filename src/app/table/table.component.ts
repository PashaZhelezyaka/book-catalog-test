import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";

export class UiTable {
  columns: string[] = [];
  rows: {
    id?: any,
    cells: any[],
    data?: any,
    selected?: boolean
  }[] = [];
}


@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.css'],
  templateUrl: './table.component.html',
})
export class TableComponent {

  @Output() removeItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() headItemSort: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataSource: UiTable = new UiTable();

  constructor() {

  }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }


}

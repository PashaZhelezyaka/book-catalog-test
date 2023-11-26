import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BooksService } from "../books.service";
import { Author } from "../../interfaces/interface";
import { AuthorsService } from "../../authors/authors.service";

@Component({
  selector: 'app-form-books',
  templateUrl: './form-books.component.html',
  styleUrls: ['./form-books.component.css']
})
export class FormBooksComponent implements OnInit {

  form!: FormGroup;
  invalid: boolean = false
  authors: Author[] = []

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private authorsService: AuthorsService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      author: ['', [Validators.required]],
      title: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
    this.loadAuthors()
  }

  loadAuthors() {
    this.authorsService.getAuthors().subscribe(
      (authors: Author[] | null) => {
        if (authors) {
          this.authors = authors;
        } else {
          this.authors = []
        }
      }
    );
  }

  save() {
    console.log(this.form.value)
    if(this.form.invalid) {
      this.invalid = this.form.invalid
    }
    else {
      this.form.get('id').setValue(Math.floor(1000 + Math.random() * 9000))
      this.invalid = this.form.invalid
      this.booksService.saveAuthor(this.form.value)
        this.form.reset()
    }
  }


}

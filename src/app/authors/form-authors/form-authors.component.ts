import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthorsService } from "../authors.service";

@Component({
  selector: 'app-form-authors',
  templateUrl: './form-authors.component.html',
  styleUrls: ['./form-authors.component.css']
})
export class FormAuthorsComponent implements OnInit {

  form!: FormGroup;
  invalid: boolean = false

  constructor(
    private fb: FormBuilder,
    private authorsService: AuthorsService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      patronymic: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  save() {
    if(this.form.invalid) {
      this.invalid = this.form.invalid
    }
    else {
      this.form.get('id').setValue(Math.floor(1000 + Math.random() * 9000))
      this.invalid = this.form.invalid
      this.authorsService.saveAuthor(this.form.value)
      this.form.reset()
    }
  }

}

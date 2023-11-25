import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from "./authors/authors.component";
import { BooksComponent } from "./books/books.component";

const routes: Routes = [
  {path:"", redirectTo: '/authors', pathMatch: "full" },
  {path:"authors", component: AuthorsComponent, title: "Authors"},
  {path:"books", component: BooksComponent, title: "Books"},
  {path:"**", redirectTo: '/authors', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

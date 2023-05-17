import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TodosComponent } from './pages/todos/todos.component';
import { NotesComponent } from './pages/notes/notes.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookmarksComponent } from "./standalone/bookmarks/bookmarks.component";
import { DashNotesComponent } from "./standalone/dash-notes/dash-notes.component";
import { DashTodosComponent } from "./standalone/dash-todos/dash-todos.component";
import { DashBudgetComponent } from "./standalone/dash-budget/dash-budget.component";
import {MatDialogModule} from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { QuillModule } from "ngx-quill";
import { QuillConfigModule } from 'ngx-quill/config';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    NotesComponent,
    BudgetComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatTooltipModule,
    MatDialogModule,
    QuillModule.forRoot(),
    BookmarksComponent,
    DashNotesComponent,
    DashTodosComponent,
    DashBudgetComponent,
    QuillConfigModule.forRoot({
      modules: {
        toolbar: [
          [{ 'color': [] }, { 'background': [] }],
          ['bold', 'italic'],
          ['code-block'],
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video']                         // link and image, video
        ]
      },
      placeholder: 'Enter content here...',
      sanitize: true,
      format: 'html',
      theme: 'snow'
    })
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

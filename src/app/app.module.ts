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
import { UnderConstructionComponent } from "./pages/under-construction/under-construction.component";
import { IdSnackNotificationComponent } from "./standalone/id-snack-notification/id-snack-notification.component";
import {
  MAT_SNACK_BAR_DATA,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
  MatSnackBarRef
} from "@angular/material/snack-bar";
import { TimeKeeperComponent } from "./standalone/time-keeper/time-keeper.component";
import { ClockComponent } from "./standalone/clock/clock.component";
import { NgOptimizedImage } from "@angular/common";

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { environment } from "../environments/environment";
import { WeatherWidgetComponent } from "./standalone/weather-widget/weather-widget.component";
import { GmailWidgetComponent } from "./standalone/gmail-widget/gmail-widget.component";
import { GcalendarWidgetComponent } from "./standalone/gcalendar-widget/gcalendar-widget.component";

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    NotesComponent,
    BudgetComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    QuillModule.forRoot(),
    BookmarksComponent,
    DashNotesComponent,
    DashTodosComponent,
    DashBudgetComponent,
    QuillConfigModule.forRoot({
      modules: {
        toolbar: [
          [{'color': []}, {'background': []}],
          ['bold', 'italic'],
          ['code-block'],
          [{'header': 1}, {'header': 2}],               // custom button values
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'align': []}],
          [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent

          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video']                         // link and image, video
        ]
      },
      placeholder: 'Enter content here...',
      sanitize: false,
      format: 'html',
      theme: 'snow'
    }),
    UnderConstructionComponent,
    IdSnackNotificationComponent,
    TimeKeeperComponent,
    ClockComponent,
    NgOptimizedImage,
    SocialLoginModule,
    WeatherWidgetComponent,
    GmailWidgetComponent,
    GcalendarWidgetComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {provide: MAT_SNACK_BAR_DATA, useValue: {}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['id-snack-notification']
    }
    },
    {provide: MatSnackBarRef, useValue: {}},
    {provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID,
              {
                scopes: [
                  'https://www.googleapis.com/auth/gmail.readonly',
                  'https://www.googleapis.com/auth/calendar.readonly',
                  'https://www.googleapis.com/auth/drive.file'
                ]
              })
          }
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

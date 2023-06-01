import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBookmark } from "../../utils/interfaces";
import { Bookmark, BookmarksService } from "../../shared/bookmarks.service";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CheckImageDirective } from "../../directives/check-image.directive";
import { MatDialog } from "@angular/material/dialog";
import { SimpleQuestionDialogComponent } from "../../dialogs/simple-question-dialog/simple-question-dialog.component";
import {
  DIALOG_QUESTION_ANIMATION_ENTER, DIALOG_QUESTION_ANIMATION_EXIT,
  DIALOG_QUESTION_CLASS, DIALOG_QUESTION_WIDTH
} from "../../utils/internal-data";
import {
  AddEditBookmarkDialogComponent
} from "../../dialogs/add-edit-bookmark-dialog/add-edit-bookmark-dialog.component";
import { WINDOW } from "../../shared/window.token";


@Component({
  selector: 'id-bookmarks',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, CheckImageDirective],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarks: IBookmark[] = [];

  bookmarksService = inject(BookmarksService)
  matDialog = inject(MatDialog)

  public window: any = inject(WINDOW)
  public isMobile: boolean = this.window.navigator.userAgentData.mobile

  ngOnInit() {
    this.bookmarks = this.bookmarksService.getBookmarks()
  }

  openAddBookmarkDialog() {
    let addDialog = this.matDialog.open(AddEditBookmarkDialogComponent, {
      width: this.isMobile ? '95vw' : DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: 'Add new bookmark',
        type: 'add',
        titleInput: '',
        srcInput: ''
      }
    })

    addDialog.afterClosed().subscribe(result => {
      if (result && result.type == 'add') {
        this.addNewBookmark(result.title, result.src)
      }
    })
  }

  addNewBookmark(title: string, src: string) {
    let newBookmark: IBookmark = new Bookmark(title, src)
    this.bookmarksService.addBookmark(newBookmark)
    this.bookmarks = this.bookmarksService.getBookmarks()
  }

  openEditBookmarkDialog(tile: IBookmark) {
    let editDialog = this.matDialog.open(AddEditBookmarkDialogComponent, {
      width: this.isMobile ? '95vw' : DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: 'Edit bookmark',
        type: 'edit',
        titleInput: tile.title,
        srcInput: tile.src,
      }
    })

    editDialog.afterClosed().subscribe(result => {
      if (result && result.type == 'edit') {
        this.editBookmark(tile.uid, result.title, result.src)
      }
    })
  }

  editBookmark(uid: string, title: string, src: string) {
    this.bookmarksService.editBookmark(uid, title, src)
    this.bookmarks = this.bookmarksService.getBookmarks()
  }

  openDeleteBookmarkDialog(tile: IBookmark ) {
    let deleteDialog = this.matDialog.open(SimpleQuestionDialogComponent, {
      width: this.isMobile ? '95vw' : DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: `Delete: ${tile.title}`,
        question: 'Are you sure you want to delete this bookmark?'
      }
    })

    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBookmark(tile.uid)
      }
    })
  }

  deleteBookmark(uid: string) {
    this.bookmarksService.deleteBookmark(uid)
    this.bookmarks = this.bookmarksService.getBookmarks()
  }

  getFavicon(src: URL) {
    return `https://www.google.com/s2/favicons?domain=${src}&sz=32`
  }
}

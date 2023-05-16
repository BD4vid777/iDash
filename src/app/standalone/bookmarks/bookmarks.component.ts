import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBookmark } from "../../utils/interfaces";
import { Bookmark, BookmarksService } from "../../shared/bookmarks.service";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CheckImageDirective } from "../../directives/check-image.directive";
import { MatDialog } from "@angular/material/dialog";
import { SimpleQuestionDialogComponent } from "../../dialogs/simple-question-dialog/simple-question-dialog.component";
import {
  DialogQuestionAnimationTimeEnter, DialogQuestionAnimationTimeExit,
  DialogQuestionClass, DialogQuestionWidth
} from "../../utils/internal-data";


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

  ngOnInit() {
    this.bookmarks = this.bookmarksService.getBookmarks()
  }

  addNewBookmark(title: string, src: string) {
    let newBookmark = new Bookmark(title, src)
    this.bookmarksService.addBookmark(newBookmark)
    this.bookmarks = this.bookmarksService.getBookmarks()
  }

  editBookmark(uid: string) {
    this.bookmarksService.editBookmark(uid, 'zmiana', 'https://www.wtatv.com')
    this.bookmarks = this.bookmarksService.getBookmarks()
  }

  openDeleteBookmarkDialog(tile: IBookmark ) {
    let deleteDialog = this.matDialog.open(SimpleQuestionDialogComponent, {
      width: DialogQuestionWidth,
      enterAnimationDuration: DialogQuestionAnimationTimeEnter,
      exitAnimationDuration: DialogQuestionAnimationTimeExit,
      panelClass: DialogQuestionClass,
      data: {
        title: `Delete: ${tile.title}`,
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

}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBookmark } from "../../utils/interfaces";
import { Bookmark, BookmarksService } from "../../shared/bookmarks.service";
import { MatTooltipModule } from "@angular/material/tooltip";


@Component({
  selector: 'id-bookmarks',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarks: IBookmark[] = [];

  bookmarksService = inject(BookmarksService)

  ngOnInit() {
    this.bookmarks = this.bookmarksService.getBookmarks()
  }

  addNewBookmark(title: string, src: string) {
    let newBookmark = new Bookmark(title, src)
    this.bookmarksService.addBookmark(newBookmark)
    this.bookmarks = this.bookmarksService.getBookmarks()
  }

  editBookmark(uid: string) {
    // TODO - implement editWindow
    this.bookmarksService.editBookmark(uid, 'zmiana', 'https://www.wtatv.com')
    this.bookmarks = this.bookmarksService.getBookmarks()
  }

  deleteBookmark(uid: string) {
    // TODO - implement deleteWindow
    this.bookmarksService.deleteBookmark(uid)
    this.bookmarks = this.bookmarksService.getBookmarks()
  }

}

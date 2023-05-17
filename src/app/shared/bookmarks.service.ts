import { inject, Injectable } from '@angular/core';
import { v4 as uuid4 } from 'uuid'
import { IBookmark } from "../utils/interfaces";
import { StorageDataService } from "./storage-data.service";

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  bookmarks: IBookmark[] = []
  private storageService = inject(StorageDataService)

  constructor() {
    this.getBookmarksFromStorage()
  }

  private getBookmarksFromStorage() {
    let userData = this.storageService.getUserData()
    this.bookmarks = userData.userBookmarks
  }

  setBookmarksToStorage() {
    let userData = this.storageService.getUserData()
    userData.userBookmarks = this.bookmarks
    this.storageService.setUserData(userData)
    this.getBookmarksFromStorage()
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark)
    this.setBookmarksToStorage()
  }

  editBookmark(uid: string, title: string, src: string) {
    const bookmark = this.bookmarks.find(bookmark => bookmark.uid === uid)
    if (!bookmark) return
    Object.assign(bookmark, { title, src })
    this.setBookmarksToStorage()
  }

  deleteBookmark(uid: string) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.uid !== uid)
    this.setBookmarksToStorage()
  }

  getBookmarks() {
    return this.bookmarks
  }
}

export class Bookmark {
  title: string
  src: URL
  target: '_blank' | '_self'
  uid: string

  constructor(title: string, src: string, target: '_blank' | '_self' = '_blank') {
    this.title = title
    this.src = new URL(src)
    this.target = target
    this.uid = uuid4()
  }
}

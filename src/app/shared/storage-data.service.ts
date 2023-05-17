import { Injectable } from '@angular/core';
import { IBackground, IBookmark, IUserStorageData } from "../utils/interfaces";
import { primaryBG, UserDataStorageKey } from "../utils/internal-data";
import { Bookmark } from "./bookmarks.service";

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {

  public userDataStorageKey: string = UserDataStorageKey
  private userDataFromStorage!: IUserStorageData
  private bgPrimary: IBackground = primaryBG

  setUserData(data: IUserStorageData) {
    this.userDataFromStorage = data
    localStorage.setItem(this.userDataStorageKey, JSON.stringify(this.userDataFromStorage))
  }

  getUserDataFromStorage(): IUserStorageData {
    let userData = localStorage.getItem(this.userDataStorageKey)

    if (!userData) {
      this.userDataFromStorage = this.setDefaultData()
      localStorage.setItem(this.userDataStorageKey, JSON.stringify(this.userDataFromStorage))
    } else {
      this.userDataFromStorage = JSON.parse(userData)
    }

    return this.userDataFromStorage
  }

  getUserData() {
    return this.userDataFromStorage
  }

  setDefaultData() {
    let tmpBookmarks: IBookmark[] = [
      new Bookmark('Google', 'https://www.google.com'),
      new Bookmark('YouTube', 'https://www.youtube.com')
    ]

    return {
      userName: '',
      userLogin: '',
      userDevices: [],
      userBookmarks: tmpBookmarks,
      userTodos: [],
      userNotes: [],
      userBudget: [],
      userBackground: this.bgPrimary,
      showWelcomeMsg: true,
      homePageQuestion: true
    }
  }
}

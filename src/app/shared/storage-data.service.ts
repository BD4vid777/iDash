import { Injectable } from '@angular/core';
import { IBackground, IBoard, IBookmark, ITodo, IUserStorageData } from "../utils/interfaces";
import { primaryBG, UserDataStorageKey } from "../utils/internal-data";
import { Bookmark } from "./bookmarks.service";
import { Board, Column, Todo } from "./todos.service";

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

  setDefaultData(): IUserStorageData {
    let tmpBookmarks: IBookmark[] = [
      new Bookmark('Google', 'https://www.google.com'),
      new Bookmark('YouTube', 'https://www.youtube.com')
    ]

    let tmpUserTodosBoards: IBoard[] = [
      new Board('Main Board', true)
    ]

    let tmpUserTodos: ITodo[] = [
      new Todo('Welcome to iDash!', 'This is your first todo. You can edit or delete it.',25, new Date(), 'medium', new Column('To Do', tmpUserTodosBoards[0].uid).uid, tmpUserTodosBoards[0].uid)
    ]

    return {
      userName: '',
      userLogin: '',
      userDevices: [],
      userBookmarks: tmpBookmarks,
      userTodos: tmpUserTodos,
      userTodosBoards: tmpUserTodosBoards,
      userNotes: [],
      userBudget: [],
      userBackground: this.bgPrimary,
      showWelcomeMsg: true,
      homePageQuestion: true
    }
  }
}

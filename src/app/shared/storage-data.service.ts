import { Injectable } from '@angular/core';
import { IBackground, IBoard, IBookmark, IBudgetValue, ITodo, IUserStorageData } from "../utils/interfaces";
import { BUDGET_CATEGORIES, DEFAULT_TODO_CONTENT, primaryBG, USER_DATA_STORAGE_KEY } from "../utils/internal-data";
import { Bookmark } from "./bookmarks.service";
import { Board, Todo } from "./todos.service";
import { BudgetValue } from "./budget.service";

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {

  public userDataStorageKey: string = USER_DATA_STORAGE_KEY
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
      new Todo('Welcome to iDash!', DEFAULT_TODO_CONTENT,25, new Date(), 0, 'Medium', tmpUserTodosBoards[0].uid, tmpUserTodosBoards[0].columns[0].uid)
    ]

    let tmpUserBudget: IBudgetValue[] = [
      new BudgetValue('Quick Eat', 126, 'McDonalds', new Date(), '', 'expense', BUDGET_CATEGORIES[0]),
      new BudgetValue('Shopping', 126, 'Grocery Market', new Date(), '', 'expense', BUDGET_CATEGORIES[0]),
      new BudgetValue('Invoice Payment', 500, 'Dev Services', new Date(), 'Boring Company', 'income', BUDGET_CATEGORIES[6]),
    ]

    return {
      userName: '',
      userLogin: '',
      userDevices: [],
      userBookmarks: tmpBookmarks,
      userTodos: tmpUserTodos,
      userTodosBoards: tmpUserTodosBoards,
      userNotes: [],
      userBudget: tmpUserBudget,
      userBackground: this.bgPrimary,
      showWelcomeMsg: true,
      homePageQuestion: true
    }
  }
}

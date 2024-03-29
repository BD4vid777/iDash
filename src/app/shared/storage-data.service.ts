import { Injectable } from '@angular/core';
import { IBackground, IBoard, IBookmark, IBudgetValue, ITodo, IUserStorageData } from "../utils/interfaces";
import { BUDGET_CATEGORIES, DEFAULT_TODO_CONTENT, primaryBG, USER_DATA_STORAGE_KEY } from "../utils/internal-data";
import { Bookmark } from "./bookmarks.service";
import { Board, Todo } from "./todos.service";
import { BudgetValue } from "./budget.service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {

  public userDataStorageKey: string = USER_DATA_STORAGE_KEY
  private userDataFromStorage!: IUserStorageData
  private userData$: BehaviorSubject<IUserStorageData | undefined> = new BehaviorSubject<IUserStorageData | undefined>(undefined)
  private bgPrimary: IBackground = primaryBG

  setUserData(data: IUserStorageData) {
    this.userDataFromStorage = data
    this.userData$.next(this.userDataFromStorage)
    localStorage.setItem(this.userDataStorageKey, JSON.stringify(this.userDataFromStorage))
  }

  getUserDataFromStorage(): IUserStorageData {
    let userData = localStorage.getItem(this.userDataStorageKey)

    if (!userData) {
      this.userDataFromStorage = this.setDefaultData()
      this.userData$.next(this.userDataFromStorage)
      localStorage.setItem(this.userDataStorageKey, JSON.stringify(this.userDataFromStorage))
    } else {
      this.userDataFromStorage = JSON.parse(userData)
      this.userData$.next(this.userDataFromStorage)
    }

    return this.userDataFromStorage
  }

  getUserData() {
    return this.userDataFromStorage
  }

  getUserDataAsObservable() {
    return this.userData$.asObservable()
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
      new BudgetValue('Lunch', 140, 'Restaurant', new Date(), '', 'expense', BUDGET_CATEGORIES[0]),
      new BudgetValue('Shopping', 80, 'Grocery Market', new Date(), '', 'expense', BUDGET_CATEGORIES[0]),
      new BudgetValue('Paycheck', 500, 'Dev Services', new Date(), 'Boring Company', 'income', BUDGET_CATEGORIES[6]),
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
      showCalendarList: false,
      showGmailList: false,
      showWeatherWidget: false,
      homePageQuestion: true,
      highScore: 0
    }
  }
}

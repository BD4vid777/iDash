import { Injectable } from '@angular/core';
import { IBackground, IUserStorageData } from "../utils/interfaces";
import { primaryBG, tmpBookmarks, tmpNotes, tmpTodos, UserDataStorageKey } from "../utils/internal-data";

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
    return {
      userName: '',
      userLogin: '',
      userDevices: [],
      userBookmarks: tmpBookmarks,
      userTodos: tmpTodos,
      userNotes: tmpNotes,
      userBudget: [],
      userBackground: this.bgPrimary,
      showWelcomeMsg: true
    }
  }
}

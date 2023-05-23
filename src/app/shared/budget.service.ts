import { inject, Injectable } from '@angular/core';
import { IBudgetValue } from "../utils/interfaces";
import { v4 as uuid4 } from "uuid";
import { StorageDataService } from "./storage-data.service";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgetData: IBudgetValue[] = []
  private storageService = inject(StorageDataService)

  constructor() {
    this.getBudgetDataFromStorage()
  }

  private getBudgetDataFromStorage() {
    let userData = this.storageService.getUserData()
    this.budgetData = userData.userBudget
  }

  private setBudgetDataToStorage() {
    let userData = this.storageService.getUserData()
    userData.userBudget = this.budgetData
    this.storageService.setUserData(userData)
    this.getBudgetDataFromStorage()
  }

  addBudgetValue(budget: BudgetValue) {
    this.budgetData.push(budget)
    this.setBudgetDataToStorage()
  }

  editBudgetValue(uid: string, title: string, value: number, content: string, createdAt: Date, createdBy: string, type: 'income' | 'expense', tag: string) {
    const budget = this.budgetData.find(budget => budget.uid === uid)
    if (!budget) return
    Object.assign(budget, { title, value, content, createdAt, createdBy, type, tag })
    this.setBudgetDataToStorage()
  }

  deleteBudgetValue(uid: string) {
    this.budgetData = this.budgetData.filter(budget => budget.uid !== uid)
    this.setBudgetDataToStorage()
  }

  getBudgetData() {
    return this.budgetData
  }
}

export class BudgetValue {
  title: string
  value: number
  content: string
  createdAt: Date
  createdBy: string
  type: 'income' | 'expense'
  tag: string
  uid: string

  constructor(title: string, value: number, content: string, createdAt: Date, createdBy: string, type: 'income' | 'expense', tag: string) {
    this.title = title
    this.value = value
    this.content = content
    this.createdAt = createdAt
    this.createdBy = createdBy
    this.type = type
    this.tag = tag
    this.uid = uuid4()
  }
}

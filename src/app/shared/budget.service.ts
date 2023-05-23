import { Injectable } from '@angular/core';
import { IBudgetValue } from "../utils/interfaces";
import { v4 as uuid4 } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgetData: IBudgetValue[] = []

  constructor() { }

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

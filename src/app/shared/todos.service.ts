import { inject, Injectable } from '@angular/core';
import { v4 as uuid4 } from 'uuid'
import { StorageDataService } from "./storage-data.service";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todos: Todo[] = []
  private storageService = inject(StorageDataService)

  constructor() {
    this.getTodosFromStorage()
  }

  private getTodosFromStorage() {
    let userData = this.storageService.getUserData()
    this.todos = userData.userTodos
  }


}

export class Todo {
  title: string
  content: string
  createdAt: Date
  dueDate: Date | undefined
  priority: 'low' | 'medium' | 'high'
  column: { name: string, uid: string }
  board: { name: string, uid: string }
  completed: boolean
  uid: string

  constructor(title: string, content: string, dueDate: Date | undefined, priority: 'low' | 'medium' | 'high', column: { name: string, uid: string }, board: { name: string, uid: string }) {
    this.title = title
    this.content = content
    this.dueDate = dueDate
    this.priority = priority
    this.column = column
    this.board = board
    this.completed = false
    this.createdAt = new Date()
    this.uid = uuid4()
  }
}

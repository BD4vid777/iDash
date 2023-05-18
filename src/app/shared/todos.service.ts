import { inject, Injectable } from '@angular/core';
import { v4 as uuid4 } from 'uuid'
import { StorageDataService } from "./storage-data.service";
import { IBoard, IColumn } from "../utils/interfaces";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todos: Todo[] = []
  private storageService = inject(StorageDataService)

  constructor() {
    this.getTodosDataFromStorage()
  }

  private getTodosDataFromStorage() {
    let userData = this.storageService.getUserData()
    this.todos = userData.userTodos
  }


}

export class Todo {
  title: string
  content: string
  createdAt: Date
  editedAt: Date
  dueDate: Date | undefined
  priority: 'low' | 'medium' | 'high'
  column: IColumn
  columnIndex: number
  board: IBoard
  completed: boolean
  uid: string

  constructor(title: string, content: string, dueDate: Date | undefined, priority: 'low' | 'medium' | 'high', column: IColumn, board: IBoard) {
    this.title = title
    this.content = content
    this.dueDate = dueDate
    this.priority = priority
    this.column = column
    this.columnIndex = 0
    this.board = board
    this.completed = false
    this.createdAt = new Date()
    this.editedAt = new Date()
    this.uid = uuid4()
  }
}

export class Board {
  name: string
  uid: string
  columns: IColumn[]
  isPrimary: boolean

  constructor(name: string, isPrimary = false) {
    this.name = name
    this.uid = uuid4()
    this.columns = [
      new Column('To Do', this.uid),
      new Column('In Progress', this.uid),
      new Column('Done', this.uid)
    ]
    this.isPrimary = isPrimary
  }
}

export class Column {
  name: string
  boardUid: string
  uid: string

  constructor(name: string, boardUid: string) {
    this.name = name
    this.boardUid = boardUid
    this.uid = uuid4()
  }
}

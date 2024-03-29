import { inject, Injectable } from '@angular/core';
import { v4 as uuid4 } from 'uuid'
import { StorageDataService } from "./storage-data.service";
import { IColumn } from "../utils/interfaces";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IdSnackNotificationComponent } from "../standalone/id-snack-notification/id-snack-notification.component";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private todos: Todo[] = []
  private boards: Board[] = []

  private snack = inject(MatSnackBar)
  private storageService = inject(StorageDataService)

  constructor() {
    this.getTodosDataFromStorage()
  }

  private getTodosDataFromStorage() {
    let userData = this.storageService.getUserData()
    this.todos = userData.userTodos
    this.boards = userData.userTodosBoards
  }

  private setTodosToStorage() {
    let userData = this.storageService.getUserData()
    userData.userTodos = this.todos
    userData.userTodosBoards = this.boards
    this.storageService.setUserData(userData)
    this.getTodosDataFromStorage()
  }

  addTodo (todo: Todo) {
    this.todos.push(todo)
    this.snack.openFromComponent(IdSnackNotificationComponent, {
      data: {
        message: 'Todo added successfully!',
        type: 'success',
        icon: 'todo'
      }
    })
    this.setTodosToStorage()
  }

  editTodo(uid: string, title: string, content: string, progress: number, dueDate: Date | "",timeSpent: number, priority: string, boardUid: string, columnUid: string, completed: boolean) {
    const todo = this.todos.find(todo => todo.uid === uid)
    if (!todo) {
      this.snack.openFromComponent(IdSnackNotificationComponent, {
        data: {
          message: 'Todo not found!',
          type: 'warning',
          icon: 'todo'
        }
      })
      return
    }
    let editedAt = new Date()
    Object.assign(todo, { title, content, progress, dueDate, timeSpent, priority, boardUid, columnUid, completed, editedAt })
    this.snack.openFromComponent(IdSnackNotificationComponent, {
      data: {
        message: 'Todo edited successfully!',
        type: 'info',
        icon: 'todo'
      }
    })
    this.setTodosToStorage()
  }

  deleteTodo(uid: string) {
    this.todos = this.todos.filter(todo => todo.uid !== uid)
    this.snack.openFromComponent(IdSnackNotificationComponent, {
      data: {
        message: 'Todo deleted successfully!',
        type: 'error',
        icon: 'todo'
      }
    })
    this.setTodosToStorage()
  }

  updateTodoStatus(uid: string, completed: boolean, setToHundred: boolean = false) {
    let updatedTodo = this.todos.findIndex(todo => todo.uid === uid)
    this.todos[updatedTodo].completed = !completed
    if (setToHundred) {
      this.todos[updatedTodo].progress = 100
    }
    this.todos[updatedTodo].editedAt = new Date()
    this.snack.openFromComponent(IdSnackNotificationComponent, {
      data: {
        message: 'Todo status updated!',
        type: 'info',
        icon: 'todo'
      }
    })
    this.setTodosToStorage()
  }

  addColumn(boardUid: string, name: string) {
    const board = this.boards.find(board => board.uid === boardUid)
    if (!board) return
    board.columns.push({ name, boardUid, uid: uuid4() })
    this.setTodosToStorage()
  }

  editColumn(uid: string, boardUid: string, name: string) {
    const board = this.boards.find(board => board.uid === boardUid)
    if (!board) return
    const column = board.columns.find(column => column.uid === uid)
    if (!column) return
    Object.assign(column, { name })
    // search boards and update column name
    this.boards.forEach(board => {
      board.columns.forEach(column => {
        if (column.uid === uid) {
          column.name = name
        }
      })
    })
    this.setTodosToStorage()
  }

  deleteColumn(uid: string, boardUid: string) {
    const board = this.boards.find(board => board.uid === boardUid)
    if (!board) return
    board.columns = board.columns.filter(column => column.uid !== uid)
    // search todos and deleteTodos with this column
    this.todos = this.todos.filter(todo => todo.columnUid !== uid)
    this.setTodosToStorage()
  }

  addBoard(board: Board) {
    this.boards.push(board)
    this.setTodosToStorage()
  }

  editBoard(uid: string, name: string) {
    const board = this.boards.find(board => board.uid === uid)
    if (!board) return
    Object.assign(board, { name })
    // search todos and update board name
    this.setTodosToStorage()
  }

  deleteBoard(uid: string) {
    this.boards = this.boards.filter(board => board.uid !== uid)
    // search todos and deleteTodos with this board
    this.todos = this.todos.filter(todo => todo.boardUid !== uid)
    this.setTodosToStorage()
  }

  getBoards() {
    return this.boards
  }

  getColumns(boardUid: string) {
    const board = this.boards.find(board => board.uid === boardUid)
    if (!board) return []
    return board.columns
  }

  getBoardName(boardUid: string): string {
    const board = this.boards.find(board => board.uid === boardUid)
    if (!board) return ''
    return board.name
  }

  getColumnName(columnUid: string, boardUid: string): string {
    const board = this.boards.find(board => board.uid === boardUid)
    if (!board) return ''
    const column = board.columns.find(column => column.uid === columnUid)
    if (!column) return ''
    return column.name
  }

  getTodos() {
    return this.todos;
  }
}

export class Todo {
  title: string
  content: string
  progress: number
  createdAt: Date
  timeSpent: number
  editedAt: Date
  dueDate: Date | ''
  priority: 'Low' | 'Medium' | 'High'
  columnUid: string
  columnIndex: number
  boardUid: string
  completed: boolean
  uid: string

  constructor(title: string, content: string, progress: number = 0, dueDate: Date | '', timeSpent: number = 0, priority: 'Low' | 'Medium' | 'High',  boardUid: string, columnUid: string,) {
    this.title = title
    this.content = content
    this.progress = progress
    this.dueDate = dueDate
    this.timeSpent = timeSpent
    this.priority = priority
    this.columnUid = columnUid
    this.columnIndex = 0
    this.boardUid = boardUid
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

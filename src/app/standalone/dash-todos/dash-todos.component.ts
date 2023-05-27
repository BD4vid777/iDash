import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "../title-header/title-header.component";
import { ITodo } from "../../utils/interfaces";
import { Todo, TodosService } from "../../shared/todos.service";
import { MatDialog } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SimpleQuestionDialogComponent } from "../../dialogs/simple-question-dialog/simple-question-dialog.component";
import {
  DIALOG_EDIT_ADD_TODO_WIDTH,
  DIALOG_QUESTION_ANIMATION_ENTER,
  DIALOG_QUESTION_ANIMATION_EXIT, DIALOG_QUESTION_CLASS,
  DIALOG_QUESTION_WIDTH
} from "../../utils/internal-data";
import { AddEditTodoDialogComponent } from "../../dialogs/add-edit-todo-dialog/add-edit-todo-dialog.component";
import { TodoPreviewDialogComponent } from "../../dialogs/todo-preview-dialog/todo-preview-dialog.component";

@Component({
  selector: 'id-dash-todos',
  standalone: true,
  imports: [CommonModule, TitleHeaderComponent, MatTooltipModule],
  templateUrl: './dash-todos.component.html',
  styleUrls: ['./dash-todos.component.scss']
})
export class DashTodosComponent implements OnInit {
  todos: ITodo[] = []
  latestDueTodos: ITodo[] = []

  todosService = inject(TodosService)
  matDialog = inject(MatDialog)

  ngOnInit() {
    this.setLatestDueTodos()
  }

  setLatestDueTodos() {
    this.todos = this.todosService.getTodos()
    this.latestDueTodos = this.todos.sort((a, b) => new Date(b.editedAt).getTime() - new Date(a.editedAt).getTime()).slice(0, 10)
  }

  openAddTodoDialog() {
    let addDialog = this.matDialog.open(AddEditTodoDialogComponent, {
      width: DIALOG_EDIT_ADD_TODO_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: 'Add new todo',
        type: 'add',
        title: '',
        content: '',
        progress: 0,
        dueDate: '',
        priority: 'low',
        boardUid: this.todosService.getBoards()[0].uid,
        columnUid: this.todosService.getBoards()[0].columns[0].uid,
        completed: false
      }
    })

    addDialog.afterClosed().subscribe(result => {
      if (result && result.type == 'add') {
        this.addNewTodo(result.title, result.content, result.progress, result.dueDate, result.timeSpent, result.priority, result.boardUid, result.columnUid)
      }
    })
  }

  addNewTodo(title: string, content: string, progress: number, dueDate: Date | '', timeSpent: number, priority: 'Low' | 'Medium' | 'High', boardUid: string, columnUid: string) {
    let newTodo: ITodo = new Todo(title, content, progress, dueDate, timeSpent, priority, boardUid, columnUid)
    this.todosService.addTodo(newTodo)
    this.setLatestDueTodos()
  }

  openEditTodoDialog(todo: ITodo) {
    let editDialog = this.matDialog.open(AddEditTodoDialogComponent, {
      width: DIALOG_EDIT_ADD_TODO_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: `Edit: ${todo.title}`,
        type: 'edit',
        title: todo.title,
        content: todo.content,
        progress: todo.progress,
        dueDate: todo.dueDate,
        timeSpent: todo.timeSpent,
        priority: todo.priority,
        boardUid: todo.boardUid,
        columnUid: todo.columnUid,
        completed: todo.completed
      }
    })

    editDialog.afterClosed().subscribe(result => {
      if (result && result.type == 'edit') {
        this.editTodo(todo.uid, result.title, result.content, result.progress, result.dueDate, result.timeSpent, result.priority, result.boardUid, result.columnUid)
      }
    })
  }

  editTodo(uid: string, title: string, content: string, progress: number, dueDate: Date | '', timeSpent: number, priority: string, boardUid: string, columnUid: string, completed: boolean = false) {
    this.todosService.editTodo(uid, title, content, progress, dueDate, timeSpent, priority, boardUid, columnUid, completed)
    this.setLatestDueTodos()
  }

  showTodoPreview(todo: ITodo) {
    let previewDialog = this.matDialog.open(TodoPreviewDialogComponent, {
      width: DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: `Preview: ${todo.title}`,
        todo: todo
      }
    })

    previewDialog.afterClosed().subscribe(result => {
      if (result == 'edit') {
        this.openEditTodoDialog(todo)
      } else if (result == 'delete') {
        this.openDeleteTodoDialog(todo)
      }
    })
  }

  openDeleteTodoDialog(todo: ITodo) {
    let deleteDialog = this.matDialog.open(SimpleQuestionDialogComponent, {
      width: DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: `Delete: ${todo.title}`,
        question: 'Are you sure you want to delete this todo?'
      }
    })

    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTodo(todo.uid)
      }
    })
  }

  deleteTodo(uid: string) {
    this.todosService.deleteTodo(uid)
    this.setLatestDueTodos()
  }

  updateTodoStatus(todo: ITodo) {
    if (!todo.completed && todo.progress != 100) {
      let completeQuestionDialog = this.matDialog.open(SimpleQuestionDialogComponent, {
        width: DIALOG_QUESTION_WIDTH,
        enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
        exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
        panelClass: DIALOG_QUESTION_CLASS,
        data: {
          dialogTitle: `Todo progress: ${todo.progress}%`,
          question: 'Set todo progress to 100%?',
          yesButton: 'Yes, set to 100%',
          noButton: 'No, keep current progress'
        }
      })

      completeQuestionDialog.afterClosed().subscribe(result => {
        if (result) {
          this.todosService.updateTodoStatus(todo.uid, todo.completed, true)
          this.setLatestDueTodos()
        } else {
          this.todosService.updateTodoStatus(todo.uid, todo.completed)
          this.setLatestDueTodos()
        }
      })
    } else {
      this.todosService.updateTodoStatus(todo.uid, todo.completed)
      this.setLatestDueTodos()
    }
  }
}

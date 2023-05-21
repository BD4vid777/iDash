import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "../title-header/title-header.component";
import { ITodo } from "../../utils/interfaces";
import { Todo, TodosService } from "../../shared/todos.service";
import { MatDialog } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SimpleQuestionDialogComponent } from "../../dialogs/simple-question-dialog/simple-question-dialog.component";
import {
  DialogQuestionAnimationTimeEnter,
  DialogQuestionAnimationTimeExit, DialogQuestionClass,
  DialogQuestionWidth
} from "../../utils/internal-data";
import { AddEditTodoDialogComponent } from "../../dialogs/add-edit-todo-dialog/add-edit-todo-dialog.component";

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
    this.latestDueTodos = this.todos.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime() || new Date(b.editedAt).getTime() - new Date(a.editedAt).getTime()).slice(0, 10)
  }

  openAddTodoDialog() {
    let addDialog = this.matDialog.open(AddEditTodoDialogComponent, {
      width: DialogQuestionWidth,
      enterAnimationDuration: DialogQuestionAnimationTimeEnter,
      exitAnimationDuration: DialogQuestionAnimationTimeExit,
      panelClass: DialogQuestionClass,
      data: {
        dialogTitle: 'Add new todo',
        type: 'add',
        title: '',
        content: '',
        progress: 0,
        dueDate: '',
        priority: 'low',
        boardUid: this.todosService.getBoards()[0].uid,
        columnUid: this.todosService.getBoards()[0].columns[0].uid
      }
    })

    addDialog.afterClosed().subscribe(result => {
      if (result && result.type == 'add') {
        this.addNewTodo(result.title, result.content, result.progress, result.dueDate, result.priority, result.boardUid, result.columnUid)
      }
    })
  }

  addNewTodo(title: string, content: string, progress: number, dueDate: Date | '', priority: 'low' | 'medium' | 'high', boardUid: string, columnUid: string) {
    let newTodo: ITodo = new Todo(title, content, progress, dueDate, priority, boardUid, columnUid)
    this.todosService.addTodo(newTodo)
    this.setLatestDueTodos()
  }

  showTodoPreview(todo: ITodo) {

  }

  openEditTodoDialog(todo: ITodo) {

  }

  editTodo() {

  }

  openDeleteTodoDialog(todo: ITodo) {
    let deleteDialog = this.matDialog.open(SimpleQuestionDialogComponent, {
      width: DialogQuestionWidth,
      enterAnimationDuration: DialogQuestionAnimationTimeEnter,
      exitAnimationDuration: DialogQuestionAnimationTimeExit,
      panelClass: DialogQuestionClass,
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
        width: DialogQuestionWidth,
        enterAnimationDuration: DialogQuestionAnimationTimeEnter,
        exitAnimationDuration: DialogQuestionAnimationTimeExit,
        panelClass: DialogQuestionClass,
        data: {
          dialogTitle: `Todo progress: ${todo.progress}%`,
          question: 'Set todo progress to 100%?',
          setProgress: true
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

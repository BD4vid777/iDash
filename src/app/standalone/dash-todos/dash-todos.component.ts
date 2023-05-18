import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "../title-header/title-header.component";
import { ITodo } from "../../utils/interfaces";
import { TodosService } from "../../shared/todos.service";
import { MatDialog } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SimpleQuestionDialogComponent } from "../../dialogs/simple-question-dialog/simple-question-dialog.component";
import {
  DialogQuestionAnimationTimeEnter,
  DialogQuestionAnimationTimeExit, DialogQuestionClass,
  DialogQuestionWidth
} from "../../utils/internal-data";

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

  }

  addNewTodo() {

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
        title: `Delete: ${todo.title}`,
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
    this.todosService.updateTodoStatus(todo.uid, todo.completed)
    this.setLatestDueTodos()
  }
}

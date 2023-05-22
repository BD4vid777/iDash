import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { IAddEditTodoDialogData } from "../../utils/interfaces";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { TodosService } from "../../shared/todos.service";

@Component({
  selector: 'id-add-edit-todo-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './add-edit-todo-dialog.component.html',
  styleUrls: ['./add-edit-todo-dialog.component.scss']
})
export class AddEditTodoDialogComponent implements OnInit {

  private dialogRef: MatDialogRef<IAddEditTodoDialogData> = inject(MatDialogRef<AddEditTodoDialogComponent>)
  private data: IAddEditTodoDialogData = inject(MAT_DIALOG_DATA)
  private fb: FormBuilder = inject(FormBuilder)

  private todosService = inject(TodosService)

  public todoForm!: FormGroup<{
    title: FormControl<string>,
    content: FormControl<string>,
    progress: FormControl<number>,
    dueDate: FormControl<Date | ''>,
    priority: FormControl<'low' | 'medium' | 'high'>
    boardUid: FormControl<string>,
    columnUid: FormControl<string>
  }>

  public dialogTitle: string = this.data.dialogTitle
  public type: 'add' | 'edit' = this.data.type
  public title: string = this.data.title
  public content: string = this.data.content
  public progress: number = this.data.progress
  public dueDate: Date | '' = this.data.dueDate
  public priority: 'low' | 'medium' | 'high' = this.data.priority
  public boardUid: string = this.data.boardUid
  public columnUid: string = this.data.columnUid

  public boards = this.todosService.getBoards()

  ngOnInit() {
    this.todoForm = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control(this.type == 'add' ? '' : this.title),
      content: this.fb.nonNullable.control(this.type == 'add' ? '' : this.content),
      progress: this.fb.nonNullable.control(this.type == 'add' ? 0 : this.progress),
      dueDate: this.fb.nonNullable.control(this.type == 'add' ? '' : this.dueDate),
      priority: this.fb.nonNullable.control(this.type == 'add' ? 'low' : this.priority),
      boardUid: this.fb.nonNullable.control(this.type == 'add' ? this.boards[0].uid : this.boardUid),
      columnUid: this.fb.nonNullable.control(this.type == 'add' ? this.boards[0].columns[0].uid : this.columnUid)
    })
  }

  checkIfFormValid() {
    this.todoForm.markAllAsTouched()
    return this.todoForm.valid
  }

  saveTodo() {
    if (this.type == 'add') this.addNewTodo()
    else this.editTodo()
  }

  addNewTodo() {
    if (!this.checkIfFormValid()) return

    this.dialogRef.close({
      type: 'add',
      title: this.todoForm.value.title,
      content: this.todoForm.value.content,
      progress: this.todoForm.value.progress,
      dueDate: this.todoForm.value.dueDate,
      priority: this.todoForm.value.priority,
      boardUid: this.todoForm.value.boardUid,
      columnUid: this.todoForm.value.columnUid
    })
  }

  editTodo() {
    if (!this.checkIfFormValid()) return

    this.dialogRef.close({
      type: 'edit',
      title: this.todoForm.value.title,
      content: this.todoForm.value.content,
      progress: this.todoForm.value.progress,
      dueDate: this.todoForm.value.dueDate,
      priority: this.todoForm.value.priority,
      boardUid: this.todoForm.value.boardUid,
      columnUid: this.todoForm.value.columnUid
    })
  }

  closeDialog() {
    this.dialogRef.close(false)
  }

}

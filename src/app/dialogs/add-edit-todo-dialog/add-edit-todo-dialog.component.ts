import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { IAddEditTodoDialogData } from "../../utils/interfaces";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TodosService } from "../../shared/todos.service";
import { QuillEditorComponent } from "ngx-quill";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { TODO_PRIORITIES } from "../../utils/internal-data";

@Component({
  selector: 'id-add-edit-todo-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, QuillEditorComponent, ReactiveFormsModule, MatOptionModule, MatSelectModule],
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
    timeSpentH: FormControl<number>,
    timeSpentM: FormControl<number>,
    timeSpentS: FormControl<number>,
    priority: FormControl<'low' | 'medium' | 'high'>
    boardUid: FormControl<string>,
    columnUid: FormControl<string>,
    completed: FormControl<boolean>
  }>

  public dialogTitle: string = this.data.dialogTitle
  public type: 'add' | 'edit' = this.data.type
  public title: string = this.data.title
  public content: string = this.data.content
  public progress: number = this.data.progress
  public dueDate: Date | '' = this.data.dueDate
  public timeSpent: number = this.data.timeSpent
  public priority: 'low' | 'medium' | 'high' = this.data.priority
  public boardUid: string = this.data.boardUid
  public columnUid: string = this.data.columnUid
  public completed: boolean = this.data.completed

  public boards = this.todosService.getBoards()
  public boardColumns = this.todosService.getColumns(this.boardUid)
  priorities: string[] = TODO_PRIORITIES

  ngOnInit() {
    this.todoForm = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control(this.type == 'add' ? '' : this.title, [Validators.required]),
      content: this.fb.nonNullable.control(this.type == 'add' ? '' : this.content),
      progress: this.fb.nonNullable.control(this.type == 'add' ? 0 : this.progress),
      dueDate: this.fb.nonNullable.control(this.type == 'add' ? '' : this.dueDate),
      timeSpentH: this.fb.nonNullable.control(this.type == 'add' ? 0 : Math.floor(this.timeSpent / 3600)),
      timeSpentM: this.fb.nonNullable.control(this.type == 'add' ? 0 : Math.floor(this.timeSpent / 60)),
      timeSpentS: this.fb.nonNullable.control(this.type == 'add' ? 0 : this.timeSpent % 60),
      priority: this.fb.nonNullable.control(this.type == 'add' ? 'low' : this.priority, [Validators.required]),
      boardUid: this.fb.nonNullable.control(this.type == 'add' ? this.boards[0].uid : this.boardUid, [Validators.required]),
      columnUid: this.fb.nonNullable.control(this.type == 'add' ? this.boards[0].columns[0].uid : this.columnUid, [Validators.required]),
      completed: this.fb.nonNullable.control(this.type == 'add' ? false : this.completed)
    })

    if (this.type == 'edit') this.todoForm.get('boardUid')?.disable()

    this.todoForm.controls.boardUid.valueChanges.subscribe((value: string) => {
      this.boardColumns = this.todosService.getColumns(value)
      this.todoForm.controls.columnUid.setValue(this.boardColumns[0].uid)
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
      timeSpent: <number>this.todoForm.value.timeSpentH * 3600 + <number>this.todoForm.value.timeSpentM * 60 + <number>this.todoForm.value.timeSpentS,
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
      timeSpent: <number>this.todoForm.value.timeSpentH * 3600 + <number>this.todoForm.value.timeSpentM * 60 + <number>this.todoForm.value.timeSpentS,
      priority: this.todoForm.value.priority,
      boardUid: this.todoForm.value.boardUid,
      columnUid: this.todoForm.value.columnUid
    })
  }

  closeDialog() {
    this.dialogRef.close(false)
  }

}

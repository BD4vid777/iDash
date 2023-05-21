import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ITodo, ITodoPreviewDialogData } from "../../utils/interfaces";

@Component({
  selector: 'id-todo-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './todo-preview-dialog.component.html',
  styleUrls: ['./todo-preview-dialog.component.scss']
})
export class TodoPreviewDialogComponent {

  private dialogRef = inject(MatDialogRef<TodoPreviewDialogComponent>)
  private data: ITodoPreviewDialogData = inject(MAT_DIALOG_DATA)

  public dialogTitle: string = this.data.dialogTitle
  public todo: ITodo = this.data.todo

  closeEdit() {
    this.dialogRef.close('edit')
  }

  closeDelete() {
    this.dialogRef.close('delete')
  }

  close() {
    this.dialogRef.close(false)
  }

}

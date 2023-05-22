import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ITodo, ITodoPreviewDialogData } from "../../utils/interfaces";
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TodosService } from "../../shared/todos.service";

@Component({
  selector: 'id-todo-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatDividerModule, MatTooltipModule],
  templateUrl: './todo-preview-dialog.component.html',
  styleUrls: ['./todo-preview-dialog.component.scss']
})
export class TodoPreviewDialogComponent {

  private dialogRef = inject(MatDialogRef<TodoPreviewDialogComponent>)
  private data: ITodoPreviewDialogData = inject(MAT_DIALOG_DATA)
  todosService = inject(TodosService)

  public dialogTitle: string = this.data.dialogTitle
  public todo: ITodo = this.data.todo

  public boardName = this.getBoardName(this.todo.boardUid)
  public columnName = this.getColumnName(this.todo.columnUid, this.todo.boardUid)

  closeEdit() {
    this.dialogRef.close('edit')
  }

  closeDelete() {
    this.dialogRef.close('delete')
  }

  close() {
    this.dialogRef.close(false)
  }

  getBoardName(boardUid: string): string {
    return this.todosService.getBoardName(boardUid);
  }

  getColumnName(columnUid: string, boardUid: string): string {
    return this.todosService.getColumnName(columnUid, boardUid);
  }
}

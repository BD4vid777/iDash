import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { INotePreviewDialogData } from "../../utils/interfaces";
import { NoSanitizePipe } from "../../pipes/noSanitize.pipe";

@Component({
  selector: 'id-note-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, NoSanitizePipe],
  templateUrl: './note-preview-dialog.component.html',
  styleUrls: ['./note-preview-dialog.component.scss']
})
export class NotePreviewDialogComponent {

  private dialogRef = inject(MatDialogRef<NotePreviewDialogComponent>)
  private data: INotePreviewDialogData = inject(MAT_DIALOG_DATA)

  public dialogTitle: string = this.data.dialogTitle
  public contentInput: string = this.data.contentInput

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

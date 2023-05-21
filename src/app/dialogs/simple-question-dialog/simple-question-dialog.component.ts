import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ISimpleQuestionDialogData } from "../../utils/interfaces";

@Component({
  selector: 'id-simple-question-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './simple-question-dialog.component.html',
  styleUrls: ['./simple-question-dialog.component.scss']
})
export class SimpleQuestionDialogComponent {

  public dialogRef = inject(MatDialogRef<SimpleQuestionDialogComponent>)
  public data: ISimpleQuestionDialogData = inject(MAT_DIALOG_DATA)

  public dialogTitle: string = this.data.dialogTitle
  public question: string = this.data.question
  public setProgress: boolean = this.data.setProgress

  close() {
    this.dialogRef.close(false)
  }
}

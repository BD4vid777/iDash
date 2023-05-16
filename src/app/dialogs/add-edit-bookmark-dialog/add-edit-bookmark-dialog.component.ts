import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { IAddEditBookmarkDialogData } from "../../utils/interfaces";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'id-add-edit-bookmark-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './add-edit-bookmark-dialog.component.html',
  styleUrls: ['./add-edit-bookmark-dialog.component.scss']
})
export class AddEditBookmarkDialogComponent implements OnInit {

  public dialogRef: MatDialogRef<IAddEditBookmarkDialogData> = inject(MatDialogRef<AddEditBookmarkDialogComponent>)
  public data: IAddEditBookmarkDialogData = inject(MAT_DIALOG_DATA)
  private fb: FormBuilder = inject(FormBuilder)

  public bookmarkForm!: FormGroup<{
    titleInput: FormControl<string>,
    srcInput: FormControl<string>
  }>

  public title: string = this.data.title
  public type: 'add' | 'edit' = this.data.type
  public titleInput: string = this.data.titleInput
  public srcInput: string = this.data.srcInput

  ngOnInit() {
    this.bookmarkForm = this.fb.nonNullable.group({
      titleInput: this.fb.nonNullable.control(this.type == 'add' ? '' : this.titleInput),
      srcInput: this.fb.nonNullable.control(this.type == 'add' ? '' : this.srcInput)
    })
  }

  addNewBookmark() {
    let title = this.bookmarkForm.controls.titleInput.value
    let src = this.bookmarkForm.controls.srcInput.value
    this.dialogRef.close({type: 'add', title, src})
  }

  editBookmark() {
    let title = this.bookmarkForm.controls.titleInput.value
    let src = this.bookmarkForm.controls.srcInput.value
    this.dialogRef.close({type: 'edit', title, src})
  }

  close() {
    this.dialogRef.close(false)
  }

}

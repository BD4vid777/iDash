import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { IAddEditBookmarkDialogData } from "../../utils/interfaces";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'id-add-edit-bookmark-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './add-edit-bookmark-dialog.component.html',
  styleUrls: ['./add-edit-bookmark-dialog.component.scss']
})
export class AddEditBookmarkDialogComponent implements OnInit {

  private dialogRef: MatDialogRef<IAddEditBookmarkDialogData> = inject(MatDialogRef<AddEditBookmarkDialogComponent>)
  private data: IAddEditBookmarkDialogData = inject(MAT_DIALOG_DATA)
  private fb: FormBuilder = inject(FormBuilder)

  public bookmarkForm!: FormGroup<{
    titleInput: FormControl<string>,
    srcInput: FormControl<string>
  }>

  public dialogTitle: string = this.data.dialogTitle
  public type: 'add' | 'edit' = this.data.type
  public titleInput: string = this.data.titleInput
  public srcInput: string = this.data.srcInput

  ngOnInit() {
    this.bookmarkForm = this.fb.nonNullable.group({
      titleInput: this.fb.nonNullable.control(this.type == 'add' ? '' : this.titleInput, [Validators.required]),
      srcInput: this.fb.nonNullable.control(this.type == 'add' ? '' : this.srcInput, [Validators.required, Validators.pattern('(https?://).([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')])
    })
  }

  checkIfFormValid() {
    this.bookmarkForm.markAllAsTouched()
    return this.bookmarkForm.valid
  }

  addNewBookmark() {
    if (!this.checkIfFormValid()) return
    let title = this.bookmarkForm.controls.titleInput.value
    let src = this.bookmarkForm.controls.srcInput.value
    this.dialogRef.close({type: 'add', title, src})
  }

  editBookmark() {
    if (!this.checkIfFormValid()) return
    let title = this.bookmarkForm.controls.titleInput.value
    let src = this.bookmarkForm.controls.srcInput.value
    this.dialogRef.close({type: 'edit', title, src})
  }

  saveBookmark() {
    if (this.type == 'add') this.addNewBookmark()
    else this.editBookmark()
  }

  close() {
    this.dialogRef.close(false)
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IAddEditNoteDialogData } from "../../utils/interfaces";

@Component({
  selector: 'id-add-edit-note-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './add-edit-note-dialog.component.html',
  styleUrls: ['./add-edit-note-dialog.component.scss']
})
export class AddEditNoteDialogComponent implements OnInit {

  private dialogRef: MatDialogRef<IAddEditNoteDialogData> = inject(MatDialogRef<AddEditNoteDialogComponent>)
  private data: IAddEditNoteDialogData = inject(MAT_DIALOG_DATA)
  private fb: FormBuilder = inject(FormBuilder)

  public noteForm!: FormGroup<{
    titleInput: FormControl<string>,
    contentInput: FormControl<string>
  }>

  public title: string = this.data.title
  public type: 'add' | 'edit' = this.data.type
  public titleInput: string = this.data.titleInput
  public contentInput: string = this.data.contentInput

  // TODO: add quill editor

  ngOnInit() {
    this.noteForm = this.fb.nonNullable.group({
      titleInput: this.fb.nonNullable.control(this.type == 'add' ? '' : this.titleInput),
      contentInput: this.fb.nonNullable.control(this.type == 'add' ? '' : this.contentInput)
    })
  }

  checkIfFormValid() {
    this.noteForm.markAllAsTouched()
    return this.noteForm.valid
  }

  addNewNote() {
    if (!this.checkIfFormValid()) return
    let title = this.noteForm.controls.titleInput.value
    let content = this.noteForm.controls.contentInput.value
    this.dialogRef.close({type: 'add', title, content})
  }

  editNote() {
    if (!this.checkIfFormValid()) return
    let title = this.noteForm.controls.titleInput.value
    let content = this.noteForm.controls.contentInput.value
    this.dialogRef.close({type: 'edit', title, content})
  }

  saveNote() {
    if (this.type == 'add') this.addNewNote()
    else this.editNote()
  }

  close() {
    this.dialogRef.close(false)
  }
}

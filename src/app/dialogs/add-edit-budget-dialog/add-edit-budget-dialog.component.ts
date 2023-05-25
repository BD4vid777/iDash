import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { BudgetService } from "../../shared/budget.service";
import { BUDGET_CATEGORIES } from "../../utils/internal-data";

@Component({
  selector: 'id-add-edit-budget-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './add-edit-budget-dialog.component.html',
  styleUrls: ['./add-edit-budget-dialog.component.scss']
})
export class AddEditBudgetDialogComponent {

  private dialogRef: MatDialogRef<AddEditBudgetDialogComponent> = inject(MatDialogRef<AddEditBudgetDialogComponent>)
  private data: AddEditBudgetDialogComponent = inject(MAT_DIALOG_DATA)
  private fb: FormBuilder = inject(FormBuilder)

  public budgetForm!: FormGroup<{
    title: FormControl<string>,
    value: FormControl<number>,
    content: FormControl<string>,
    createdAt: FormControl<Date>,
    createdBy: FormControl<string>,
    typeOfValue: FormControl<'income' | 'expense'>,
    tag: FormControl<string>,
    uid: FormControl<string>
  }>

  public dialogTitle: string = this.data.dialogTitle
  public type: 'add' | 'edit' = this.data.type
  public title: string = this.data.title
  public value: number = this.data.value
  public content: string = this.data.content
  public createdAt: Date = this.data.createdAt
  public createdBy: string = this.data.createdBy
  public typeOfValue: 'income' | 'expense' = this.data.typeOfValue
  public tag: string = this.data.tag
  public uid: string = this.data.uid ? this.data.uid : ''

  tags: string[] = BUDGET_CATEGORIES

  ngOnInit() {
    this.budgetForm = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control(this.type == 'add' ? '' : this.title, [Validators.required]),
      value: this.fb.nonNullable.control(this.type == 'add' ? 0.00 : this.value, [Validators.required]),
      content: this.fb.nonNullable.control(this.type == 'add' ? '' : this.content),
      createdAt: this.fb.nonNullable.control(this.type == 'add' ? new Date() : this.createdAt),
      createdBy: this.fb.nonNullable.control(this.type == 'add' ? '' : this.createdBy),
      typeOfValue: this.fb.nonNullable.control(this.typeOfValue),
      tag: this.fb.nonNullable.control(this.type == 'add' ? '' : this.tag),
      uid: this.fb.nonNullable.control(this.type == 'add' ? '' : this.uid)
    })
  }

  checkIfFormValid() {
    this.budgetForm.markAllAsTouched()
    return this.budgetForm.valid
  }

  saveValue() {
    if (this.type == 'add') this.addNewValue()
    else this.editValue()
  }

  addNewValue() {
    if (!this.checkIfFormValid()) return

    this.dialogRef.close({
      type: 'add',
      title: this.budgetForm.value.title,
      value: this.budgetForm.value.value,
      content: this.budgetForm.value.content,
      createdAt: this.budgetForm.value.createdAt,
      createdBy: this.budgetForm.value.createdBy,
      typeOfValue: this.budgetForm.value.typeOfValue,
      tag: this.budgetForm.value.tag
    })
  }

  editValue() {
    if (!this.checkIfFormValid()) return

    this.dialogRef.close({
      type: 'edit',
      title: this.budgetForm.value.title,
      value: this.budgetForm.value.value,
      content: this.budgetForm.value.content,
      createdAt: this.budgetForm.value.createdAt,
      createdBy: this.budgetForm.value.createdBy,
      typeOfValue: this.budgetForm.value.typeOfValue,
      tag: this.budgetForm.value.tag,
      uid: this.budgetForm.value.uid
    })
  }

  closeDialog() {
    this.dialogRef.close(false)
  }
}

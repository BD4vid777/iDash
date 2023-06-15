import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "../title-header/title-header.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IBudgetValue } from "../../utils/interfaces";
import { BudgetService, BudgetValue } from "../../shared/budget.service";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { SimpleQuestionDialogComponent } from "../../dialogs/simple-question-dialog/simple-question-dialog.component";
import {
  DIALOG_QUESTION_ANIMATION_ENTER,
  DIALOG_QUESTION_ANIMATION_EXIT, DIALOG_QUESTION_CLASS,
  DIALOG_QUESTION_WIDTH
} from "../../utils/internal-data";
import { AddEditBudgetDialogComponent } from "../../dialogs/add-edit-budget-dialog/add-edit-budget-dialog.component";
import { WINDOW } from "../../shared/window.token";

@Component({
  selector: 'id-dash-budget',
  standalone: true,
  imports: [CommonModule, TitleHeaderComponent, MatTooltipModule, MatDividerModule],
  templateUrl: './dash-budget.component.html',
  styleUrls: ['./dash-budget.component.scss']
})
export class DashBudgetComponent implements OnInit {
  budgetData: IBudgetValue[] = []
  budgetIncomeData: IBudgetValue[] = []
  budgetExpenseData: IBudgetValue[] = []
  monthlyBudgetBalance: number = 0
  currentMonth = new Date().toLocaleString('en-GB', { month: 'long' })

  budgetService = inject(BudgetService)
  matDialog = inject(MatDialog)

  public window: any = inject(WINDOW)
  public isMobile: boolean = this.window.navigator.userAgentData ? this.window.navigator.userAgentData.mobile : this.window.navigator.userAgent.includes('Mobile')

  ngOnInit() {
    this.setBudgetData()
  }

  setBudgetData() {
    this.budgetData = this.budgetService.getBudgetData()
    let currentMonth = new Date().getMonth()
    this.budgetIncomeData = this.budgetData.filter(budgetValue => budgetValue.type == 'income' && new Date(budgetValue.createdAt).getMonth() === currentMonth)
    this.budgetExpenseData = this.budgetData.filter(budgetValue => budgetValue.type == 'expense' && new Date(budgetValue.createdAt).getMonth() === currentMonth)
    this.setMonthlyBudgetBalance(currentMonth)
  }

  setMonthlyBudgetBalance(currentMonth: number) {
    let currentMonthBudgetData = this.budgetData.filter(budgetValue => new Date(budgetValue.createdAt).getMonth() === currentMonth)

    let getBalance = (budgetValue: IBudgetValue) => {
      if (budgetValue.type == 'income') {
        return budgetValue.value
      } else {
        return -budgetValue.value
      }
    }

    this.monthlyBudgetBalance = 0
    this.monthlyBudgetBalance = currentMonthBudgetData.reduce((acc, budgetValue) => acc + getBalance(budgetValue), 0)
  }

  addValue(type: 'income' | 'expense') {
    let addDialog = this.matDialog.open(AddEditBudgetDialogComponent, {
      width: this.isMobile ? '95vw' : DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: `Add ${type.toUpperCase()}`,
        type: 'add',
        title: '',
        value: 0,
        content: '',
        createdAt: new Date(),
        createdBy: '',
        typeOfValue: type,
        tag: ''
      }
    })

    addDialog.afterClosed().subscribe(result => {
      if (result && result.type == 'add') {
        let newBudgetValue: IBudgetValue = new BudgetValue(result.title, result.value, result.content, result.createdAt, result.createdBy, result.typeOfValue, result.tag)
        this.budgetService.addBudgetValue(newBudgetValue)
        this.setBudgetData()
      }
    })
  }

  openEditBudgetDialog(item: IBudgetValue) {
    let editDialog = this.matDialog.open(AddEditBudgetDialogComponent, {
      width: this.isMobile ? '95vw' : DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: `Edit ${item.type.toUpperCase()} - ${item.title}`,
        type: 'edit',
        title: item.title,
        value: item.value,
        content: item.content,
        createdAt: item.createdAt,
        createdBy: item.createdBy,
        typeOfValue: item.type,
        tag: item.tag,
        uid: item.uid
      }
    })

    editDialog.afterClosed().subscribe(result => {
      if (result && result.type == 'edit') {
        this.budgetService.editBudgetValue(item.uid, result.title, result.value, result.content, result.createdAt, result.createdBy, result.typeOfValue, result.tag)
        this.setBudgetData()
      }
    })
  }

  openDeleteBudgetDialog(item: IBudgetValue) {
    let deleteDialog = this.matDialog.open(SimpleQuestionDialogComponent, {
      width: this.isMobile ? '95vw' : DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: `Delete: ${item.title} - ${item.value}`,
        question: `Are you sure you want to delete this ${item.type.toUpperCase()}?`,
      }
    })

    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBudgetValue(item.uid)
      }
    })
  }

  deleteBudgetValue(uid: string) {
    this.budgetService.deleteBudgetValue(uid)
    this.setBudgetData()
  }
}

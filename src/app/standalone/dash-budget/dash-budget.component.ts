import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "../title-header/title-header.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IBudgetValue } from "../../utils/interfaces";
import { BudgetService } from "../../shared/budget.service";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { SimpleQuestionDialogComponent } from "../../dialogs/simple-question-dialog/simple-question-dialog.component";
import {
  DIALOG_QUESTION_ANIMATION_ENTER,
  DIALOG_QUESTION_ANIMATION_EXIT, DIALOG_QUESTION_CLASS,
  DIALOG_QUESTION_WIDTH
} from "../../utils/internal-data";

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

  ngOnInit() {
    this.setBudgetData()
    this.setMonthlyBudgetBalance()
  }

  setBudgetData() {
    this.budgetData = this.budgetService.getBudgetData()
    this.budgetIncomeData = this.budgetData.filter(budgetValue => budgetValue.type == 'income')
    this.budgetExpenseData = this.budgetData.filter(budgetValue => budgetValue.type == 'expense')
    this.setMonthlyBudgetBalance()
  }

  setMonthlyBudgetBalance() {
    let currentMonth = new Date().getMonth()
    let currentMonthBudgetData = this.budgetData.filter(budgetValue => new Date(budgetValue.createdAt).getMonth() === currentMonth)

    this.monthlyBudgetBalance = 0
    this.monthlyBudgetBalance = currentMonthBudgetData.reduce((acc, budgetValue) => budgetValue.type == 'income' ? acc + budgetValue.value : acc - budgetValue.value, 0)
  }

  addValue(type: 'income' | 'expense') {

  }

  openEditBudgetDialog(item: IBudgetValue) {

  }

  openDeleteBudgetDialog(item: IBudgetValue) {
    let deleteDialog = this.matDialog.open(SimpleQuestionDialogComponent, {
      width: DIALOG_QUESTION_WIDTH,
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

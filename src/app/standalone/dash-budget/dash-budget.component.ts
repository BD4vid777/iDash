import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "../title-header/title-header.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IBudgetValue } from "../../utils/interfaces";
import { BudgetService } from "../../shared/budget.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'id-dash-budget',
  standalone: true,
  imports: [CommonModule, TitleHeaderComponent, MatTooltipModule],
  templateUrl: './dash-budget.component.html',
  styleUrls: ['./dash-budget.component.scss']
})
export class DashBudgetComponent implements OnInit {
  budgetData: IBudgetValue[] = []
  monthlyBudgetBalance: number = 0

  budgetService = inject(BudgetService)
  matDialog = inject(MatDialog)

  ngOnInit() {
    this.setBudgetData()
    this.setMonthlyBudgetBalance()
  }

  setBudgetData() {
    this.budgetData = this.budgetService.getBudgetData()
  }

  setMonthlyBudgetBalance() {
    let currentMonth = new Date().getMonth()
    let currentMonthBudgetData = this.budgetData.filter(budgetValue => new Date(budgetValue.createdAt).getMonth() === currentMonth)

    this.monthlyBudgetBalance = 0
    this.monthlyBudgetBalance = currentMonthBudgetData.reduce((acc, budgetValue) => acc + budgetValue.value, 0)
  }

}

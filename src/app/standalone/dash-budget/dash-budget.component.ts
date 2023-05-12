import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "../title-header/title-header.component";

@Component({
  selector: 'id-dash-budget',
  standalone: true,
  imports: [CommonModule, TitleHeaderComponent],
  templateUrl: './dash-budget.component.html',
  styleUrls: ['./dash-budget.component.scss']
})
export class DashBudgetComponent {

}

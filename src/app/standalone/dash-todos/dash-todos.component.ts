import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "../title-header/title-header.component";

@Component({
  selector: 'id-dash-todos',
  standalone: true,
    imports: [CommonModule, TitleHeaderComponent],
  templateUrl: './dash-todos.component.html',
  styleUrls: ['./dash-todos.component.scss']
})
export class DashTodosComponent {

}

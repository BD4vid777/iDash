import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "../title-header/title-header.component";
import { ITodo } from "../../utils/interfaces";

@Component({
  selector: 'id-dash-notes',
  standalone: true,
    imports: [CommonModule, TitleHeaderComponent],
  templateUrl: './dash-notes.component.html',
  styleUrls: ['./dash-notes.component.scss']
})
export class DashNotesComponent {
  @Input() notes: ITodo[] = [];


}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "../title-header/title-header.component";

@Component({
  selector: 'id-dash-notes',
  standalone: true,
    imports: [CommonModule, TitleHeaderComponent],
  templateUrl: './dash-notes.component.html',
  styleUrls: ['./dash-notes.component.scss']
})
export class DashNotesComponent {

}

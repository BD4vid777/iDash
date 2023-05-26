import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo } from "../../utils/interfaces";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: 'id-time-keeper',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './time-keeper.component.html',
  styleUrls: ['./time-keeper.component.scss']
})
export class TimeKeeperComponent {
  @Input() triggerData!: ITodo
  @Output() triggerKeeper = new EventEmitter<{ trigger: 'play' | 'pause' | 'stop', time: number, uid: string }>()

}

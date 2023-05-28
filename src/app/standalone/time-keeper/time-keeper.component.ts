import { Component, HostListener, inject, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITodo } from "../../utils/interfaces";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TodosService } from "../../shared/todos.service";
import { TimeKeeperService } from "../../shared/time-keeper.service";
import { setTimeCounterToString } from "../../utils/global-methods";

@Component({
  selector: 'id-time-keeper',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './time-keeper.component.html',
  styleUrls: ['./time-keeper.component.scss']
})
export class TimeKeeperComponent implements OnDestroy {
  @Input() triggerData!: ITodo

  time: string = ''
  timeCounter: number = 0;

  interval: NodeJS.Timer | undefined;

  todosService = inject(TodosService)
  timeKeeperService = inject(TimeKeeperService)

@HostListener('window:beforeunload')
async ngOnDestroy() {
    await this.saveTodoTimeSpent()
  }

  ngOnInit(): void {
    this.timeCounter = this.triggerData.timeSpent
    this.interval = setInterval(() => {
      this.timeCounter++
      this.time = this.setTimeCounterToString(this.timeCounter)
    }, 1000);
  }

  setTimeCounterToString(time: number) {
    return setTimeCounterToString(time)
  }

  triggerKeeper(param: { uid: string; trigger: string; time: number }) {
    switch (param.trigger) {
      case 'play':
        if (this.interval) return
        this.interval = setInterval(() => {
          this.timeCounter++
          this.time = this.setTimeCounterToString(this.timeCounter)
        }, 1000);
        break;
      case 'pause':
        if (!this.interval) return
        clearInterval(this.interval)
        this.interval = undefined
        break;
      case 'stop':
        if (!this.interval) return
        this.saveTodoTimeSpent()
        break;
    }
  }

  saveTodoTimeSpent() {
    clearInterval(this.interval)
    this.triggerData.timeSpent = this.timeCounter
    this.todosService.editTodo(
      this.triggerData.uid,
      this.triggerData.title,
      this.triggerData.content,
      this.triggerData.progress,
      this.triggerData.dueDate,
      this.triggerData.timeSpent,
      this.triggerData.priority,
      this.triggerData.boardUid,
      this.triggerData.columnUid,
      this.triggerData.completed)
    this.timeKeeperService.setTimeKeeper(undefined)
  }
}

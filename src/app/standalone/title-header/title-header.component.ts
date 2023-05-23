import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'id-title-header',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, RouterLink],
  template: `
    <div class="title-wrapper">
      <span [routerLink]="route">{{title}}</span>
      <div
        *ngIf="hasCounter"
        [style.background-color]="counterColor == '' ? '#4580ee' : counterColor"
        [matTooltip]="counterTooltip"
        matTooltipClass="id-tooltip"
      >{{title == 'Budget' ? counter.toFixed(2) : counter}}</div>
    </div>

  `,
  styles: [
    `
    :host {
      position: absolute; inset: 0; height: 65px;
    }
    .title-wrapper {
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.2rem;
      font-weight: 600;
      padding: 1rem 1.5rem;
      width: 100%;
      height: 100%;
      text-align: start;
      background-color: rgba(255,255,255, 0.75);
      backdrop-filter: blur(5px);

      span {
        cursor: pointer;
      }

      div {
        padding: 0.3rem .8rem;
        border-radius: 5px;
        background-color: #4580ee;
        color: rgba(255, 255, 255, 0.9);

        cursor: help;
      }
    }`
  ]
})
export class TitleHeaderComponent {
  @Input() route: string = '';
  @Input() title: string = '';
  @Input() hasCounter: boolean = true;
  @Input() counterColor: string = '';
  @Input() counter: number = 0;
  @Input() counterTooltip: string = '';
}

import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'id-under-construction',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss']
})
export class UnderConstructionComponent implements OnInit {
  private router = inject(Router)

  @Input() pageTitle: string = ''
  public seconds: number = 3

  ngOnInit() {
    const secondsInterval = setInterval(() => {
      this.seconds--
    }, 1000)
    setTimeout(() => {
      clearInterval(secondsInterval)
      this.router.navigate(['/']).then(() => console.log('Redirected to home page'))
    }, 3500)
  }
}

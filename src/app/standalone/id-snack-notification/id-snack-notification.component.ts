import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from "@angular/material/snack-bar";
import { ISnackNotificationData } from "../../utils/interfaces";

@Component({
  selector: 'id-snack-notification',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './id-snack-notification.component.html',
  styleUrls: ['./id-snack-notification.component.scss']
})
export class IdSnackNotificationComponent {
  public data: ISnackNotificationData = inject(MAT_SNACK_BAR_DATA)
  public snackRef = inject(MatSnackBarRef)
}

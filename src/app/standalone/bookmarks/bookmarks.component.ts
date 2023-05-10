import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBookmark } from "../../utils/interfaces";

@Component({
  selector: 'id-bookmarks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent {
  @Input() bookmarks: IBookmark[] = [];

  addNewBookmark() {

  }

}

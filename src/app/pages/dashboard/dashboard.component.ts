import { Component, OnInit } from '@angular/core';
import { IBookmark } from "../../utils/interfaces";
import { tmpBookmarks } from "../../utils/internal-data";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  time: string = new Date().toLocaleTimeString();
  date: string = new Date().toLocaleDateString();
  bookmarks: IBookmark[] = tmpBookmarks

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
      this.date = new Date().toLocaleDateString();
    }, 1000);
  }

  addNewBookmark() {

  }
}

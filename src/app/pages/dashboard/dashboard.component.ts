import { Component, OnInit } from '@angular/core';
import { IBookmark, IDashData } from "../../utils/interfaces";
import { tmpBookmarks } from "../../utils/internal-data";

@Component({
  selector: 'id-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  time: string = new Date().toLocaleTimeString();
  date: string = new Date().toLocaleDateString();

  iDashData!: IDashData

  bookmarks: IBookmark[] = tmpBookmarks
  todos: any[] = [] // TODO: Set interface for todos
  notes: any[] = [] // TODO: Set interface for notes
  budget: any[] = [] // TODO: Set interface for budget

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
      this.date = new Date().toLocaleDateString();
    }, 1000);

    // TODO: move below to service and here get the data from service
    this.getDataFromLocalStorage();
  }

  // TODO: Move getData from storage to service and use it in all components

  private getDataFromLocalStorage() {
    const iDashUserData = localStorage.getItem('iDashUserLocalData');
    if (iDashUserData) {
      this.iDashData = JSON.parse(iDashUserData);
      this.bookmarks = this.iDashData.userBookmarks ? this.iDashData.userBookmarks : [];
    }
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ITodo } from "../utils/interfaces";

@Injectable({
  providedIn: 'root'
})
export class TimeKeeperService {
  private timeKeeper: BehaviorSubject<ITodo | undefined> = new BehaviorSubject<ITodo | undefined>(undefined)
  private timeKeeper$: Observable<ITodo | undefined> = this.timeKeeper.asObservable()
  public timeKeeperIsRunning: boolean = false
  public timeKeeperRunningTodoUid: string = ''

  setTimeKeeper(timeKeeper: ITodo | undefined) {
    this.timeKeeperIsRunning = !!timeKeeper;
    this.timeKeeper.next(timeKeeper)
  }

  getTimeKeeper(): Observable<ITodo | undefined> {
    return this.timeKeeper$
  }
}

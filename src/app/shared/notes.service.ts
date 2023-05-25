import { inject, Injectable } from '@angular/core';
import { v4 as uuid4 } from 'uuid'
import { INote } from "../utils/interfaces";
import { StorageDataService } from "./storage-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IdSnackNotificationComponent } from "../standalone/id-snack-notification/id-snack-notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: INote[] = []
  private snack = inject(MatSnackBar)
  private storageService = inject(StorageDataService)

  constructor() {
    this.getNotesFromStorage()
  }

  private getNotesFromStorage() {
    let userData = this.storageService.getUserData()
    this.notes = userData.userNotes
  }

  setNotesToStorage() {
    let userData = this.storageService.getUserData()
    userData.userNotes = this.notes
    this.storageService.setUserData(userData)
    this.getNotesFromStorage()
  }

  addNote (note: Note) {
    this.notes.push(note)
    this.snack.openFromComponent(IdSnackNotificationComponent, {
      data: {
        message: 'Note added successfully!',
        type: 'success',
        icon: 'note'
      }
    })
    this.setNotesToStorage()
  }

  editNote(uid: string, title: string, content: string) {
    const note = this.notes.find(note => note.uid === uid)
    if (!note) return
    Object.assign(note, { title, content })
    this.snack.openFromComponent(IdSnackNotificationComponent, {
      data: {
        message: 'Note edited successfully!',
        type: 'info',
        icon: 'note'
      }
    })
    this.setNotesToStorage()
  }

  deleteNote(uid: string) {
    this.notes = this.notes.filter(note => note.uid !== uid)
    this.snack.openFromComponent(IdSnackNotificationComponent, {
      data: {
        message: 'Note deleted successfully!',
        type: 'error',
        icon: 'note'
      }
    })
    this.setNotesToStorage()
  }

  getNotes() {
    return this.notes
  }
}

export class Note {
  title: string
  content: string
  createdAt: Date
  uid: string

  constructor(title: string, content: string) {
    this.title = title
    this.content = content
    this.createdAt = new Date()
    this.uid = uuid4()
  }
}

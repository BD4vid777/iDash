import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from "../title-header/title-header.component";
import { INote } from "../../utils/interfaces";
import { Note, NotesService } from "../../shared/notes.service";
import { MatDialog } from "@angular/material/dialog";
import { AddEditNoteDialogComponent } from "../../dialogs/add-edit-note-dialog/add-edit-note-dialog.component";
import {
  DIALOG_QUESTION_ANIMATION_ENTER,
  DIALOG_QUESTION_ANIMATION_EXIT, DIALOG_QUESTION_CLASS,
  DIALOG_QUESTION_WIDTH
} from "../../utils/internal-data";
import { SimpleQuestionDialogComponent } from "../../dialogs/simple-question-dialog/simple-question-dialog.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NotePreviewDialogComponent } from "../../dialogs/note-preview-dialog/note-preview-dialog.component";
import { WINDOW } from "../../shared/window.token";

@Component({
  selector: 'id-dash-notes',
  standalone: true,
  imports: [CommonModule, TitleHeaderComponent, MatTooltipModule],
  templateUrl: './dash-notes.component.html',
  styleUrls: ['./dash-notes.component.scss']
})
export class DashNotesComponent implements OnInit {
  notes: INote[] = []
  latestNotes: INote[] = []

  notesService = inject(NotesService)
  matDialog = inject(MatDialog)

  public window: any = inject(WINDOW)
  public isMobile: boolean = this.window.navigator.userAgentData.mobile

  ngOnInit() {
    this.setLatestNotes()

    // addEventListener('storage', (event) => {
    //   console.log('storage event', event)
    // })
  }

  setLatestNotes() {
    this.notes = this.notesService.getNotes()
    this.latestNotes = this.notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10)
  }

  openAddNoteDialog() {
    let addDialog = this.matDialog.open(AddEditNoteDialogComponent, {
      width: this.isMobile ? '95vw' : DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: 'Add new note',
        type: 'add',
        titleInput: '',
        contentInput: ''
      }
    })

    addDialog.afterClosed().subscribe(result => {
      if (result && result.type == 'add') {
        this.addNewNote(result.title, result.content)
      }
    })
  }

  addNewNote(title: string, content: string) {
    let newNote: INote = new Note(title, content)
    this.notesService.addNote(newNote)
    this.setLatestNotes()
  }

  openEditNoteDialog(note: INote) {
    let editDialog = this.matDialog.open(AddEditNoteDialogComponent, {
      width: this.isMobile ? '95vw' : DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: 'Edit note',
        type: 'edit',
        titleInput: note.title,
        contentInput: note.content
      }
    })

    editDialog.afterClosed().subscribe(result => {
      if (result && result.type == 'edit') {
        this.editNoteContent(note.uid, result.title, result.content)
      }
    })
  }

  editNoteContent(uid: string, title: string, content: string) {
    this.notesService.editNote(uid, title, content)
    this.setLatestNotes()
  }

  openDeleteNoteDialog(note: INote) {
    let deleteDialog = this.matDialog.open(SimpleQuestionDialogComponent, {
      width: this.isMobile ? '95vw' : DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: `Delete: ${note.title}`,
        question: 'Are you sure you want to delete this note?'
      }
    })

    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteNote(note.uid)
      }
    })
  }

  deleteNote(uid: string) {
    this.notesService.deleteNote(uid)
    this.setLatestNotes()
  }

  showNotePreview(note: INote) {
    let previewDialog = this.matDialog.open(NotePreviewDialogComponent, {
      width: this.isMobile ? '95vw' : DIALOG_QUESTION_WIDTH,
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      data: {
        dialogTitle: 'Preview: ' + note.title,
        contentInput: note.content
      }
    })

    previewDialog.afterClosed().subscribe(result => {
      if (result == 'edit') {
        this.openEditNoteDialog(note)
      } else if (result == 'delete') {
        this.openDeleteNoteDialog(note)
      }
    })
  }
}

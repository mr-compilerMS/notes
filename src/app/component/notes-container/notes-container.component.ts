import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import Note from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';
import { AddNoteComponent } from '../add-note/add-note.component';
import { NoteComponent } from '../note/note.component';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.css'],
})
export class NotesContainerComponent implements OnInit {
  @ViewChild(AddNoteComponent) addNote!: AddNoteComponent;
  modalRef?: BsModalRef;

  notes: Note[] = [];

  editingNote!: Note;

  constructor(
    private storageService: NotesService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.storageService.getAllNotes().subscribe(
      (notes) =>
        (this.notes = notes
          .sort((a, b) => b.id - a.id)
          .sort((a, b) => a.note.length - b.note.length)
          .sort((a, b) =>
            a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1
          ))
    );
  }

  editNote(note: Note) {
    this.editingNote = note;
  }
  updateNote() {
    this.storageService.updateNote(this.editingNote);
  }

  addNewNote(note: Note) {
    this.storageService
      .addNote(note)
      .subscribe({ complete: () => this.addNote.clear() });
  }
  openModal() {
    const initialState: ModalOptions = {
      initialState: { note: this.editingNote },
    };
    this.modalRef = this.modalService.show(UpdateNoteComponent, initialState);
    this.modalRef.onHide?.subscribe((value) => this.updateNote());
  }
}

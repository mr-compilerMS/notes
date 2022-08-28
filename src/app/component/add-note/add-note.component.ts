import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Note from '../../models/note';
import { getHashTags, getUrls } from '../../utils/string-utils';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  @Output() addNote = new EventEmitter<Note>();

  focused = false;
  note: Note = new Note();
  element!: any;
  constructor() {}

  ngOnInit(): void {}

  noteChanged() {
    this.note.urls = getUrls(this.note.note);
    this.note.tags = getHashTags(this.note.note);
  }
  textAreaAdjust(element: any) {
    this.element = element;
    element.style.height = '1px';
    element.style.height = element.scrollHeight + 'px';
  }
  saveNote() {
    this.addNote.emit(this.note);
  }

  clear() {
    this.note = new Note();
    this.element.style.height = '1px';
  }
}

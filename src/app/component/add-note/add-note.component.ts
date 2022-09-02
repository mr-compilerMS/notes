import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { MessageService, MessageType } from 'src/app/services/message.service';
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
  windowWidth: number = window.innerWidth;
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  noteChanged() {
    this.note.urls = getUrls(this.note.note);
    this.note.tags = getHashTags(this.note.note);
  }
  textAreaAdjust(element: any) {
    this.element = element;
    if (window.innerWidth > 576) {
      element.style.height = '1px';
      element.style.height = element.scrollHeight + 'px';
    } else {
      element.rows = 3;
    }
  }
  saveNote() {
    if (
      !(
        this.note.note.trim().length === 0 &&
        this.note.title.trim().length === 0
      )
    )
      this.addNote.emit(this.note);
    else {
      this.messageService.add({
        message: 'Empty Notes Cannot be saved',
        type: MessageType.WARNING,
        autoDismiss: true,
      });
      this.clear();
    }
  }

  clear() {
    this.note = new Note();
    if (this.element) this.element.style.height = '1px';
  }
}

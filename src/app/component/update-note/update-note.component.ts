import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import Note from 'src/app/models/note';
import { getHashTags, getUrls } from '../../utils/string-utils';
@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css'],
})
export class UpdateNoteComponent implements OnInit {
  note!: Note;
  focused = false;
  element!: any;
  constructor() {}

  ngOnInit(): void {
    let element = document.getElementById('update-textarea');
    if (element)
      element.style.height =
        document.getElementsByClassName('note-' + this.note.id)[0]
          .clientHeight -
        42 +
        'px';
  }
  noteChanged() {
    this.note.urls = getUrls(this.note.note);
    this.note.tags = getHashTags(this.note.note);
  }
  textAreaAdjust(element: any) {
    this.element = element;
    element.style.height = '1px';
    element.style.height = element.scrollHeight + 'px';
  }

  clear() {
    this.note = new Note();
    this.element.style.height = '1px';
  }
}

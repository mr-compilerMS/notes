import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import Note from 'src/app/models/note';
import { MessageService, MessageType } from 'src/app/services/message.service';
import { NotesService } from 'src/app/services/notes.service';
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
  windowWidth: number = window.innerWidth;

  constructor(
    private notesService: NotesService,
    private modalService: BsModalService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    let element = document.getElementById('update-textarea');
    if (element) {
      element.style.height =
        document.getElementsByClassName('note-' + this.note.id)[0]
          .clientHeight -
        42 +
        'px';
      if (
        element.scrollHeight > 250 ||
        Number(element.style.height.replace('px', '')) > 250
      ) {
        element.style.height = 250 + 'px';
        element.style.overflowY = 'scroll';
      }
    }
  }
  noteChanged() {
    this.note.urls = getUrls(this.note.note);
    this.note.tags = getHashTags(this.note.note);
  }
  textAreaAdjust(element: any) {
    this.element = element;
    if (element.scrollHeight < 250) {
      element.style.height = '1px';
      element.style.height = element.scrollHeight + 'px';
      element.style.overflowY = 'hidden';
    } else {
      element.style.overflowY = 'scroll';
    }
  }

  deleteNote() {
    const _this = this;
    this.notesService.deleteNote(this.note).subscribe({
      next(value) {
        if (value) {
          _this.modalService.hide();
          _this.messageService.add({
            message: 'Note Deleted..!',
            autoDismiss: true,
            type: MessageType.SUCCESS,
          });
        } else {
          _this.messageService.add({
            message: 'Error while deleting note.. Try again..',
            autoDismiss: true,
            type: MessageType.DANGER,
          });
        }
      },
    });
  }
}

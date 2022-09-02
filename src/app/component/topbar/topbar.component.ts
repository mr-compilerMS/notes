import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  @Output() searchQuery: EventEmitter<string> = new EventEmitter();
  private searchTerms = new Subject<string>();
  query$: string = '';

  constructor() {}

  ngOnInit(): void {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes

      switchMap((term: string) => of(this.searchQuery.emit(term)))
    );
  }

  searchQueryChanged() {
    this.searchTerms.next(this.query$);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { NotesContainerComponent } from './component/notes-container/notes-container.component';
import { AddNoteComponent } from './component/add-note/add-note.component';
import { NoteComponent } from './component/note/note.component';
import { UpdateNoteComponent } from './component/update-note/update-note.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MessagesComponent } from './component/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    NotesContainerComponent,
    AddNoteComponent,
    NoteComponent,
    UpdateNoteComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  constructor() {}
  add(message: Message) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}

export interface Message {
  message: string;
  type: MessageType;
  autoDismiss: boolean;
}
export enum MessageType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}

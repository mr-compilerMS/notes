import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.messageService.messages;
  }
}

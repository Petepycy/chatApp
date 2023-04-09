import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../services/web-socket.service";
import {ChatMessageDto} from "../models/chatMessageDto";

@Component({
  selector: 'cf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{

  constructor(public webSocketService: WebSocketService) {

  }

  sendMessage(sendForm: NgForm) {
    const user = sendForm.value.user;
    const message = sendForm.value.message;
    const chatMessageDto = new ChatMessageDto(user, message);
    this.webSocketService.sendMessage(chatMessageDto);
    sendForm.controls['message'].reset();
  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }
}

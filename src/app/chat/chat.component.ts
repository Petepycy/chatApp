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

  selectedFile: File | null = null;
  constructor(public webSocketService: WebSocketService) {

  }

  sendMessage(sendForm: NgForm) {
    const user = sendForm.value.user;
    const message = sendForm.value.message;
    let chatMessageDto: ChatMessageDto;

    if (this.selectedFile) {
      console.log("selectedFile before reader:", this.selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        console.log("selectedFile after reader:", this.selectedFile);
        const base64 = reader.result as string;
        const imageData = base64.split(',')[1];
        if (this.selectedFile) {
          const fileName = this.selectedFile.name;
          const fileType = this.selectedFile.type;
          chatMessageDto = new ChatMessageDto(user, message, imageData, fileName, fileType);
          this.webSocketService.sendMessage(chatMessageDto);
          this.selectedFile = null; // move this line here

        } else {
          console.error("Selected file is null");
        }
      };
    } else {
      chatMessageDto = new ChatMessageDto(user, message);
      this.webSocketService.sendMessage(chatMessageDto);
    }

    //this.selectedFile = null;
    console.log("selectedFile after sending message:", this.selectedFile);
    sendForm.controls['message'].reset();
  }



  onFileSelected(event: any) {
    setTimeout(() => {
      this.selectedFile = event.target.files[0];
      console.log("File selected:", this.selectedFile);
    }, 500);
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // set the image data to a variable
      const imageData = reader.result as string;
      // set the image data to an image element's source
      const img = new Image();
      img.src = imageData;
      // append the image element to a container element
      const container = document.querySelector('#image-container');
      if (container) {
        container.appendChild(img);
      } else {
        console.error("Container not found!");
      }
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }
}

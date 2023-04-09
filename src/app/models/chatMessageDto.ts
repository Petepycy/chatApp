export class ChatMessageDto {
  user: string;
  message: string;
  imageData?: string;
  fileName?: string;
  fileType?: string;

  constructor(user: string, message: string, imageData?: string, fileName?: string, fileType?: string) {
    this.user = user;
    this.message = message;
    this.imageData = imageData;
    this.fileName = fileName;
    this.fileType = fileType;
  }
}

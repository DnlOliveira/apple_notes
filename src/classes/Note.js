import uuid from 'uuid';

export class Note {
  constructor() {
    this.key = uuid.v4()
    this.title = "Untitled";
    this.content = "";
    this.passcode = "";
  }
}
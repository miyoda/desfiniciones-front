import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  username: string;
  userSecret: string;
  roomId: string;

  constructor() {
    this.username = sessionStorage.getItem('username');
    if (!this.username) { //Only if no local username i use the persiste from other window
      this.username = localStorage.getItem('username');
    }
    this.userSecret = sessionStorage.getItem('userSecret');
    if (!this.userSecret) {
        this.userSecret = this.generateUuidv4();
        sessionStorage.setItem('userSecret', this.userSecret);
    }
    this.roomId = sessionStorage.getItem('roomId');
  }

  private generateUuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }

  setUsername(username: string): void {
    this.username = username;
    sessionStorage.setItem('username', username);
    localStorage.setItem('username', username); // Persist for other window
  }

  setRoomId(roomId: string): void {
    this.roomId = roomId;
    if (roomId) {
      sessionStorage.setItem('roomId', roomId);
    } else {
      sessionStorage.removeItem('roomId');
    }
  }
}

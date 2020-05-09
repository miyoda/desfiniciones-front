import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketBehaviorService {

  connect = new BehaviorSubject(false);
  exception = new BehaviorSubject(undefined);
  room = new BehaviorSubject(undefined);
  results = new BehaviorSubject(undefined);

  constructor(private socket: Socket) {
    console.log('Init SocketBehaviorProvider Provider');

    socket.on('disconnect', () => {
      console.log('Disconnect');
      this.connect.next(false);
    });

    socket.on('connect', () => {
      console.log('Connect');
      this.connect.next(true);
    });

    this.connect.next(socket.ioSocket.connected);

    socket.on('exception', (exception) => {
      console.log('Exception', exception);
      this.exception.next(exception);
    });

    this.socket.on('room', (room) => {
      console.log('Room', room);
      this.room.next(room);
    });

    socket.on('results', (results) => {
      console.log('Results', results);
      this.results.next(results);
    });
  }
}

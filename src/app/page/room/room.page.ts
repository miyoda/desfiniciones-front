import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { ResultsModalComponent } from 'src/app/component/results-modal/results-modal.component';
import { UsersModalComponent } from 'src/app/component/users-modal/users-modal.component';
import { PublicRoom } from 'src/app/entity/public.room';
import { SocketBehaviorService } from 'src/app/service/socket-behavior.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  room: PublicRoom;

  readySent = false;
  definition: string;
  definitionSent: string;
  definitionVoted: string;

  constructor(
    private socketBehavior: SocketBehaviorService,
    private userService: UserService,
    private alertController: AlertController,
    private modalController: ModalController,
    private alertControler: AlertController,
    private socket: Socket,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.socketBehavior.room.subscribe((room) => {
      this.room = room;
    });
    this.socketBehavior.results.subscribe((results) => {
      if (results) {
        this.definition = '';
        this.definitionSent = '';
        this.definitionVoted = '';
        this.modalController.create({
          component: ResultsModalComponent
        }).then(modal => {
          modal.present();
        });
      }
    });
  }

  tryExit() {
    this.alertController.create({
      header: 'Salir',
      subHeader: '¿Seguro que quieres salir de la partida?',
      buttons: [
        'Cancelar',
        {
          text: 'Salir',
          handler: this.exit
        }
      ]
    }).then(alert => alert.present());
  }

  exit = () => {
    this.socket.emit('leave', {roomId: this.room.roomId, userSecret: this.userService.userSecret});
    this.userService.setRoomId(undefined);
    this.socketBehavior.room.next(undefined);

  }

  showUsers() {
    this.modalController.create({
      component: UsersModalComponent
    }).then(modal => modal.present());
  }

  ready() {
    this.socket.emit('ready', {roomId: this.room.roomId, userSecret: this.userService.userSecret});
    this.readySent = true;
  }

  sendDefinition() {
    if (this.definition) {
      this.definition = this.fixDefinition(this.definition);
      this.socket.emit('define', {roomId: this.room.roomId, userSecret: this.userService.userSecret, definition: this.definition});
      this.definitionSent = this.definition;
    }
  }

  private fixDefinition(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    if (str.charAt(str.length - 1) === '.') {
      str = str.substring(0, str.length - 1);
    }
    return str;
  }

  voteDefinition(definition) {
    console.log(definition);
    console.log(this.definitionSent);
    if (definition === this.definitionSent) {
      this.alertControler.create({
        header: 'No puedes votar tu propia definición',
        buttons: ['Aceptar']
      }).then((alert) => alert.present());
    } else {
      this.socket.emit('vote', {roomId: this.room.roomId, userSecret: this.userService.userSecret, definition: definition});
      this.definitionVoted = definition;
    }
  }

}

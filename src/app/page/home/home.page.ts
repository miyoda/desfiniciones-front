import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { HelpModalComponent } from 'src/app/component/help-modal/help-modal.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string;

  constructor(public navCtrl: NavController,
    private socket: Socket,
    private userService: UserService,
    private alertControler: AlertController,
    private modalController: ModalController,
  ) {
    this.username = userService.username;
  }

  ionViewWillEnter() {
    if (this.userService.roomId) {
      this.socket.emit('join', {
        roomId: this.userService.roomId,
        userSecret: this.userService.userSecret,
        username: this.userService.username
      });
    }
  }

  createRoom() {
    if (this.requireUsername()) {
      const roomId = this.generateString(5);
      this.socket.emit('create', { roomId });
      this.joinRoom(roomId);
    }
  }

  requestRoomId() {
    if (this.requireUsername()) {
      this.alertControler.create({
        header: 'Introduce el código de la partida',
        message: 'Pídeselo al creador de la partida.',
        inputs: [
          {
            name: 'roomId',
            placeholder: 'XXXXX',
            id: 'roomIdInput'
          },
        ],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Unirse',
          handler: (data) => {
            this.joinRoom(data.roomId.toUpperCase());
          },
        }]
      }).then((alert) => alert.present());
    }
  }

  joinRoom(roomId: string) {
    this.userService.setRoomId(roomId);
    this.socket.emit('join', { roomId, userSecret: this.userService.userSecret, username: this.username });
  }

  requireUsername(): boolean {
    if (!this.username) {
      this.alertControler.create({
        header: 'Debes introducir un nombre',
        buttons: ['Aceptar']
      }).then((alert) => alert.present());
      return false;
    } else {
      return true;
    }
  }

  onChangeUsername(username) {
    this.userService.setUsername(username);
  }

  generateString(numChars) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < numChars; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  showHelp() {
    this.modalController.create({
      component: HelpModalComponent
    }).then(modal => modal.present());
  }
}


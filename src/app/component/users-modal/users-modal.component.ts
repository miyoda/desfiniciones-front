import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PublicRoom, PublicUser } from 'src/app/entity/public.room';
import { SocketBehaviorService } from 'src/app/service/socket-behavior.service';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {

  room: PublicRoom;
  sortedUsers: PublicUser[];

  constructor(
    private socketBehavior: SocketBehaviorService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.socketBehavior.room.subscribe((room: PublicRoom) => {
      this.room = room;
      this.sortedUsers = room.users.sort((a, b) => b.points - a.points || a.username.localeCompare(b.username));
    });
  }

  dismissModal() {
    this.modalController.dismiss({});
  }
}

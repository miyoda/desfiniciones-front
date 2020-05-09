import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PublicRoom } from 'src/app/entity/public.room';
import { SocketBehaviorService } from 'src/app/service/socket-behavior.service';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss']
})
export class HelpModalComponent implements OnInit {

  room: PublicRoom;

  constructor(
    private socketBehavior: SocketBehaviorService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.socketBehavior.room.subscribe((room) => {
      this.room = room;
    });
  }

  dismissModal() {
    this.modalController.dismiss({});
  }
}

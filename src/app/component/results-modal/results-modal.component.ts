import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoundResults } from 'src/app/entity/round-results';
import { SocketBehaviorService } from 'src/app/service/socket-behavior.service';

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.component.html',
  styleUrls: ['./results-modal.component.scss']
})
export class ResultsModalComponent implements OnInit {

  results: RoundResults;

  constructor(
    private socketBehavior: SocketBehaviorService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.socketBehavior.results.subscribe((results) => {
      this.results = results;
    });
  }

  dismissModal() {
    this.socketBehavior.results.next(undefined);
    this.modalController.dismiss({});
  }

}

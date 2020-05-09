import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SocketBehaviorService } from './socket-behavior.service';

@Injectable()
export class CanActivateInRoom implements CanActivate {

  constructor(
    private socketBehavior: SocketBehaviorService,
    private router: Router
  ) {}

  canActivate() {
    const can = !!this.socketBehavior.room.value;
    if (!can) {
        this.router.navigate(['/home']);
    }
    return can;
  }
}

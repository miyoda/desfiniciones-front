import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { SocketBehaviorService } from './service/socket-behavior.service';
import { UserService } from './service/user.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  loading: any;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private socketBehavior: SocketBehaviorService,
    private socket: Socket,
    private userService: UserService,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.loading = await this.loadingController.create({
        message: 'Conectando al servidor...',
        spinner: 'crescent'
      });

      this.socketBehavior.connect.subscribe((connected) => {
          if (connected) {
            this.loading.dismiss();
          } else {
            this.loading.present();
          }
      });

      this.socketBehavior.room.subscribe(status => {
        if (status) {
          this.router.navigate(['/room']);
        } else {
          this.router.navigate(['/home']);
        }
      });

      if (this.userService.roomId) {
        this.socket.emit('join', {
          roomId: this.userService.roomId,
          userSecret: this.userService.userSecret,
          username: this.userService.username
        });
      }

    });
  }
}

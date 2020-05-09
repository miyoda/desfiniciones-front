import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelpModalComponent } from './component/help-modal/help-modal.component';
import { ResultsModalComponent } from './component/results-modal/results-modal.component';
import { UsersModalComponent } from './component/users-modal/users-modal.component';
import { CanActivateInRoom } from './service/can-activate-in-room';



// const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };
const config: SocketIoConfig = { url: 'https://desfiniciones-back.herokuapp.com', options: {} };

@NgModule({
  declarations: [AppComponent, UsersModalComponent, ResultsModalComponent, HelpModalComponent],
  entryComponents: [UsersModalComponent, ResultsModalComponent, HelpModalComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CanActivateInRoom
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { StatusService } from './../services/status.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SectorService } from './../services/sector.service';
import { ServicesService } from './../services/services.service';
import { PriorityService } from './../services/priority.service';
import { OrderService } from '../services/order.service';
import { ConfigService } from './../services/config.service';

import { ValidarService } from './../services/validar.service';
import { UsersService } from '../services/user.service';
import { FunctionService } from '../services/function.service';

@NgModule({
  declarations: [MyApp],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigService,
    OrderService,
    FunctionService,
    PriorityService,
    ServicesService,
    SectorService,
    UsersService,
    ValidarService,
    StatusService
  ]
})
export class AppModule {}

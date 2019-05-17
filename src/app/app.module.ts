import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageService } from '../services/storage.service';

import { SectorService } from './../services/sector.service';
import { ServicesService } from './../services/services.service';
import { PriorityService } from './../services/priority.service';
import { CreateOrderService } from './../services/createOrder.service';
import { ConfigService } from './../services/config.service';
import { ListarOsService } from '../services/listarOs.service';

import { ValidarInterceptorProvider } from './interceptors/validar.interceptor';
import { ValidarService } from './../services/validar.service';
import { UsersService } from './../services/users.service';
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
    ValidarInterceptorProvider,
    ConfigService,
    CreateOrderService,
    FunctionService,
    ListarOsService,
    PriorityService,
    ServicesService,
    SectorService,
    StorageService,
    UsersService,
    ValidarService
  ]
})
export class AppModule {}

import { PriorityService } from './../services/priority.service';
import { CreateOrderService } from './../services/createOrder.service';
import { ProfileService } from './../services/profile.service';
import { ConfigService } from './../services/config.service';
import { ListarOsService } from './../services/listar-os.services';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { ValidarInterceptorProvider } from './interceptors/validar.interceptor';
import { ValidarService } from './../services/validar.service';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageService } from '../services/storage.service';

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
    ListarOsService,
    ErrorInterceptorProvider,
    ValidarService,
    StorageService,
    ConfigService,
    ProfileService,
    CreateOrderService,
    PriorityService
  ]
})
export class AppModule {}

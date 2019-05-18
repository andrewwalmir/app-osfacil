import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPage } from './order.component';

@NgModule({
  declarations: [OrderPage],
  imports: [IonicPageModule.forChild(OrderPage)],
  exports: [OrderPage]
})
export class OrderDetailModule {}

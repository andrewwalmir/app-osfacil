import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailPage } from './orderDetail.component';

@NgModule({
  declarations: [OrderDetailPage],
  imports: [IonicPageModule.forChild(OrderDetailPage)],
  exports: [OrderDetailPage]
})
export class OrderDetailPageModule {}

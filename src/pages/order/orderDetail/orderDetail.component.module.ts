import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailPage } from './orderDetail.component';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [OrderDetailPage],
  imports: [IonicPageModule.forChild(OrderDetailPage)],
  exports: [OrderDetailPage],
  providers: [Camera]
})
export class OrderDetailPageModule {}

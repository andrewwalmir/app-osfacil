import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderGenericPage } from './orderGeneric.component';
import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [OrderGenericPage],
  imports: [IonicPageModule.forChild(OrderGenericPage)],
  exports: [OrderGenericPage],
  providers: [Camera]
})
export class OrderGenericPageModule {}

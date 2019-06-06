import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderGenericPage } from './orderGeneric.component';

@NgModule({
  declarations: [OrderGenericPage],
  imports: [IonicPageModule.forChild(OrderGenericPage)],
  exports: [OrderGenericPage]
})
export class OrderGenericPageModule {}

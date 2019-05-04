import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateOrderPage } from './create-order';

@NgModule({
  declarations: [CreateOrderPage],
  imports: [IonicPageModule.forChild(CreateOrderPage)],
  exports: [CreateOrderPage]
})
export class CreateOrderPageModule {}

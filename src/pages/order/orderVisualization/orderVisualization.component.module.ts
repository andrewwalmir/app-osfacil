import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderVisualizationPage } from './orderVisualization.component';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [OrderVisualizationPage],
  imports: [IonicPageModule.forChild(OrderVisualizationPage)],
  exports: [OrderVisualizationPage],
  providers: [Camera]
})
export class OrderVisualizationPageModule {}

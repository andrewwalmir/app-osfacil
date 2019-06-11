import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderVisualizationPage } from './orderVisualization.component';

@NgModule({
  declarations: [OrderVisualizationPage],
  imports: [IonicPageModule.forChild(OrderVisualizationPage)],
  exports: [OrderVisualizationPage]
})
export class OrderVisualizationPageModule {}

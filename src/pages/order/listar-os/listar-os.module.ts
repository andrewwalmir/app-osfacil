import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarOsPage } from './listar-os';

@NgModule({
  declarations: [ListarOsPage],
  imports: [IonicPageModule.forChild(ListarOsPage)],
  exports: [ListarOsPage]
})
export class ListarOsModule {}

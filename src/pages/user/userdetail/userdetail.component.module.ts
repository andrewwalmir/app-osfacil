import { Camera } from '@ionic-native/camera';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDetailPage } from './userdetail.component';

@NgModule({
  declarations: [UserDetailPage],

  imports: [IonicPageModule.forChild(UserDetailPage)],
  exports: [UserDetailPage],
  providers: [Camera]
})
export class UserDetailPageModule {}

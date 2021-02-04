import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';
import { NewcomerPageRoutingModule } from './newcomer-routing.module';
import { NewcomerPage } from './newcomer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    NewcomerPageRoutingModule
  ],
  providers: [
    UserService
  ],
  declarations: [NewcomerPage]
})
export class NewcomerPageModule {}

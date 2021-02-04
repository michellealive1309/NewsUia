import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'saveContent'
})
export class SaveContentPipe implements PipeTransform {
  constructor(private afF: AngularFirestore,private userService: UserService) {}
  transform(value: any, ...args: any[]): any {
    let saveContent = this.afF.collection('User').doc(this.userService.userInfo.uid).collection('Favorite').doc(value).snapshotChanges()
    .pipe(map(snapshotData => {
      return snapshotData.payload.exists
    }))
    return saveContent;
  }

}

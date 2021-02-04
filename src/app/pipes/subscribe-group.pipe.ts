import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../services/user.service';
import { switchMap, map } from 'rxjs/operators';

@Pipe({
  name: 'subscribeGroup'
})
export class SubscribeGroupPipe implements PipeTransform {
  constructor(private afF: AngularFirestore, private userService: UserService){}
  transform(value: any, ...args: any[]): any {
    let isSubscribe = this.userService.user.pipe(
      switchMap(userInfo => this.afF.collection('User').doc<any>(userInfo.uid).valueChanges()),
      map(profile => {
        return profile.group.length > 10 ? true : profile.group.includes(value)
      })
    )
    return isSubscribe
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { map } from 'rxjs/operators'
import { User } from '../interfaces/user';
import { of } from 'rxjs';

@Pipe({
  name: 'nameGetter'
})
export class NameGetterPipe implements PipeTransform {

  constructor(private afFirestore: AngularFirestore) {}

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return of("N/A")
    }
    return this.afFirestore.collection('User').doc<User>(value).valueChanges().pipe(map(data => data.name))
  }

}
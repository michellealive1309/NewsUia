import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Pipe({
  name: 'groupName'
})
export class GroupNamePipe implements PipeTransform {
  constructor(private afFirestore: AngularFirestore) { }
  transform(value: any, ...args: any[]): any {
    if (!value) {
      return of({name: "N/A"})
    }
    let group = this.afFirestore.collection('Group').doc<any>(value).valueChanges()
    return group;
  }

}

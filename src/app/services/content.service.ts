import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFirestore } from '@angular/fire/firestore'
import * as firebase from 'firebase'
import { Observable, merge, combineLatest, of } from 'rxjs'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  user: Observable<firebase.User>

  constructor( private afFirestore: AngularFirestore ) {
  }

  getContent(groups) {
    console.log(groups)
    if (!groups || groups.length == 0) {
      return of([])
    }
    return this.afFirestore.collection<any>('Feed', ref => ref.where('group', 'in', groups).orderBy('created', 'desc').limit(100)).snapshotChanges()
  }

  getSavedContent(uid: string) {
    return this.afFirestore.collection('User').doc(uid).collection<any>('Favorite').valueChanges()
  }

  getFeedContent(group: string[]) { //Now unused
    let splitedGroup = this.splitGroup(group)
    let groupData = splitedGroup.map(g => {
      return this.afFirestore.collection<any>('Feed', ref => ref.where('group', 'in', g).orderBy('created', 'desc').limit(50)).snapshotChanges()
    })
    return merge(...groupData)
    // return combineLatest(groupData[0], groupData[1]).pipe(map(([first, second]) => first.concat(second)))
  }

  getGroupContent(group: string) {
    return this.afFirestore.collection<any>('Feed', ref => ref.where('group', '==', group).orderBy('created', 'desc')).snapshotChanges()
  }

  async getAnnouceContent(id: string): Promise<string> {
    let queryDocs = await this.afFirestore.collection('News').doc(id).ref.get()
    return queryDocs.get('content')
  }

  private splitGroup(group: string[]) {
    let splitedGroup: string[][] = []
    for (let i = 0; i < group.length; i += 10){
      splitedGroup.push(group.slice(i, i+9))
    }
    return splitedGroup
  }

}
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFirestore } from '@angular/fire/firestore';
import { Group } from '../interfaces/group'
import { map } from 'rxjs/operators'
import { merge, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private afFirestore: AngularFirestore) { }

  public searchGroup(key: string) {
    return this.afFirestore.collection<any>('Group').valueChanges()
    .pipe(map(value => value.filter(val => val.name.toLowerCase().replace(new RegExp(' ', 'gi'), '').search(key) > -1)))
  }

  public addUserToGroup(group, uid) {
    this.afFirestore.collection('Group').doc(group).update({subscriber: firebase.firestore.FieldValue.arrayUnion(...[uid])})
  }

  public removeUserFromGroup(group, uid) {
    this.afFirestore.collection('Group').doc(group).update({subscriber: firebase.firestore.FieldValue.arrayRemove(...[uid])})
  }

  public getUserSubscribedGroup(group) {
    if (!group || group.length == 0){
      return of([])
    }
    return this.afFirestore.collection<any>('Group', ref => ref.where('id', 'in', group).orderBy('created', 'desc')).valueChanges()
  }

  //Old function
  public getFollowGroup(group: string[]) {
    let splitedGroup = this.splitGroup(group)
    let groupData = splitedGroup.map(g => {
      return this.afFirestore.collection<Group>('Group', ref => ref.where('id', 'in', g).orderBy('created', 'desc')).valueChanges()
    })
    let queriedGroup = merge(...groupData)
    return queriedGroup
  }

  private splitGroup(group: string[]) {
    let splitedGroup: string[][] = []
    for (let i = 0; i < group.length; i += 10){
      splitedGroup.push(group.slice(i, i+9))
    }
    return splitedGroup
  }

  public addSubscriberToGroup(group, uid) {
    let result = 0
    let arrayUID: string[] = [uid]
    this.afFirestore.collection('Group').doc(group).update({
      subscriber: firebase.firestore.FieldValue.arrayUnion(...arrayUID)
    }).catch(err => {
      if (!err) {
        return
      }
      console.error(err)
      result = 1
    })
    return result
  }

  public unsubscribeUserFromGroup(uid: string, group: string) {
    this.afFirestore.collection('Group').doc(group).update({subscriber: firebase.firestore.FieldValue.arrayRemove(...[uid])})
  }

}

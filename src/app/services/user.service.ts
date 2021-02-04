import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import * as firebase from 'firebase'
import { Observable, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router'
import { User } from '../interfaces/user'
import { resolve } from 'url';

@Injectable()
export class UserService {

  user: Observable<firebase.User>
  userInfo: firebase.User
  userProfile: any
  userInfo$: any
  userProfile$: any
  
  constructor(private afAuth: AngularFireAuth,
              private afF: AngularFirestore,
              private router: Router) {
                this.initService()
              }

  initService() {
    this.user = this.afAuth.authState
    this.userInfo$ = this.afAuth.authState.subscribe(userReg => {
      this.userInfo = userReg
    })
    this.userProfile$ = this.getUserProfile().subscribe(data => {
      this.userProfile = data
    })
  }

  public checkUser(user: firebase.User) {
    if (!user) {
      return new Promise(resolve => resolve(false))
    }
    return this.afF.collection('User').doc<any>(user.uid).ref.get().then(data => {
      if (!data.exists) {
        return this.afF.collection<any>('User').ref.where('email', '==', user.email).orderBy('created', 'desc').get()
        .then(preRegister => {
          let preregData = preRegister.docs.shift()
          if (preregData && preregData.exists) {
            let data = preregData.data()
            data.id = null
            return this.afF.collection('User').doc(user.uid).set(data).then(() => {
              this.afF.collection('User').doc(user.uid).update({uid: user.uid})
              preregData.ref.delete()
              return true
            }).catch(err => {
              console.error(err)
              return false
            })
          }
          user.delete()
          return false
        })
      }
      return true
    })
  }

  public getUserProfile() {
    return this.user.pipe(switchMap(userInfor => this.afF.collection('User').doc<any>(userInfor.uid).valueChanges()))
  }

  public addSaveContent(data) {
    this.afF.collection('User').doc(this.userInfo.uid).collection('Favorite').doc(data.id).set(data)
  }

  public removeSavedNews(newsContent) {
    this.afF.collection('User').doc(this.userInfo.uid).collection('Favorite').doc(newsContent.id).delete()
  }

  public addGroupToUser(group) {
    let groupId: string[] = [group]
    this.afF.collection('User').doc(this.userInfo.uid).update({group: firebase.firestore.FieldValue.arrayUnion(...groupId)})
  }

  public removeGroupFromUser(group) {
    let groupId: string[] = [group]
    this.afF.collection('User').doc(this.userInfo.uid).update({group:firebase.firestore.FieldValue.arrayRemove(...groupId)})
  }

  public deleteSavedContentFromUnsubscribeGroup(group) {
    this.afF.collection('User').doc(this.userInfo.uid).collection('Favorite').ref.where('group', '==', group).orderBy('created', 'desc').get()
    .then(querySnapshot => {
      if (!querySnapshot.empty) {
        let length = querySnapshot.docs.length
        for (let i = 0; i < length; i++) {
          querySnapshot.docs[i].ref.delete()
        }
      }
    })
    .catch(err => {console.error(err)})
  }

  signOut() {
    this.afAuth.auth.signOut()
    this.router.navigate(['../login'])
  }

  //Unused function below
  public addProfile(selectedFaculty: string, selectedMajority: string) { //Unused function but in newcomer page
    this.user.subscribe(userObs => {
      this.afF.collection('User').doc<User>('' + userObs.uid).set({
        uid: userObs.uid, name: userObs.displayName,
        email: userObs.email, isStudent: true,
        faculty: selectedFaculty, majority: selectedMajority,
        followGroup: ['000', selectedFaculty, selectedMajority]
      })
    }, error => {console.log(error)})
  }

}
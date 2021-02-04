import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  loginError: boolean = false
  loginErrorMessage: string = ""
  email: string
  password: string
  subscribeObs$: any

  constructor(  private router: Router,
                private afAuth: AngularFireAuth,
                private gplus: GooglePlus,
                private userService: UserService,
                private platform: Platform ) { }

  ngOnInit() {
    this.subscribeObs$ = this.userService.user.subscribe(userInfo => {
      this.userService.checkUser(userInfo).then(result => {
        if (result) {
          this.router.navigate(['../tabs'])
        }
      })
    }, error => (console.log(error)))
  }

  ngOnDestroy(): void {
    this.subscribeObs$.unsubscribe()
  }

  async nativeGoogleLogin(): Promise<firebase.auth.UserCredential> {
    
      let params = {
          'webClientId': '281789257178-amtulof6h32q1dk6bb66led9qqumvpo7.apps.googleusercontent.com',
          'offline': true,
          'scopes': 'profile email'
        }
  
      const gplusUser = await this.gplus.login(params)
  
      return await (gplusUser.accessToken ? this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken, gplusUser.accessToken)) : this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)))
  }

  async webGoogleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      const credential = await this.afAuth.auth.signInWithPopup(provider)
      return credential
  
  }

  public async googleLogin() {
    this.loginError = false
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin().then(user => {
        return this.userService.checkUser(user.user)
      })
      .then(result => {
        if (result) {
          this.router.navigate(['../tabs'])
        }
        else {
          this.loginError = true
          this.getErrorCode("Unknown error happened.")
        }
      })
      .catch(err => {
        console.error(err)
        this.loginError = true
        this.getErrorCode(err.code)
      })
    } else {
      this.webGoogleLogin()
      .then(user => {
        return this.userService.checkUser(user.user)
      })
      .then(result => {
        if (result) {
          this.router.navigate(['../tabs'])
        }
        else {
          this.loginError = true
          this.getErrorCode("Unknown error happened.")
        }
      })
      .catch(err => {
        console.error(err)
        this.loginError = true
        this.getErrorCode(err.code)
      })
    }
  }

  private getErrorCode(errorCode) {
    switch (errorCode) {
      case "auth/cancelled-popup-request":
        this.loginErrorMessage = "Popup canceled."
        break
      case "auth/popup-closed-by-user":
        this.loginErrorMessage = "Popup closed."
        break
      case "auth/unauthorized-domain":
        this.loginErrorMessage = "Unauthorized domain."
        break
      case "auth/user-disabled":
        this.loginErrorMessage = "Unavailable User."
        break
      case "auth/user-not-found":
        this.loginErrorMessage = "Do not found user."
        break
      case "auth/wrong-password":
        this.loginErrorMessage = "Invalid password."
        break
      default:
        this.loginErrorMessage = errorCode
        break
    }
  }

}
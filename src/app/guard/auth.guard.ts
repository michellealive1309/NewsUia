import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loggedIn: boolean

  constructor(private userService: UserService,
    private afFirestore: AngularFirestore,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let canActivate = this.userService.user.pipe(switchMap(userInfo => {
      if (!userInfo) {
        this.router.navigate(['../login'])
        return of(false)
      }
      return this.afFirestore.collection('User').doc<any>(userInfo.uid).snapshotChanges().pipe(map(snapshotUser => {
        if (snapshotUser.payload.exists) {
          return true
        }
        else {
          this.router.navigate(['../login'])
          return false
        }
      }))
    }))
    return canActivate
  }

}
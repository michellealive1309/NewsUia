import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor (
    private userService: UserService,
    private afFirestore: AngularFirestore,
    private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.user.pipe(map(userInfo => {
      if (userInfo) {
        this.router.navigate(['../tabs'])
        return false
      }
      else {
        this.router.navigate(['../login'])
        return true
      }
    }))
  }
  
}

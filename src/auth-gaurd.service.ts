import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(public router: Router) { }

  canActivate(): boolean {
    if (!this.isAuthenticated.value) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

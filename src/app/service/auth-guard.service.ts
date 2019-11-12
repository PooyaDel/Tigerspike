import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login-service';

@Injectable({
  providedIn: 'root'
})
// This class sole purpose is to guard the map route so that only logged in users can access it.
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private loginService: LoginService) { }

  canActivate(): boolean {
    if (!this.loginService.currentUser) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

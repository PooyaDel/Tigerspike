import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login-service';

@Injectable({
  providedIn: 'root'
})
// This class sole purpose is to guard the map route so that only logged in users can access it.
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private loginService: LoginService) { }
  // returns true if user has logged in and let the request to url pass to user , otherwise redirects to login page.
  canActivate(): boolean {
    if (!this.loginService.currentUser) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

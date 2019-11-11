import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from './model/user.model';
import { LoginService } from './app/service/login-service';

@Injectable({
  providedIn: 'root'
})
// This class sole purpose is to guard the map route so that only logged in users can access it.
export class AuthGaurdService implements CanActivate {

  constructor(public router: Router, private loginService: LoginService) { }

  canActivate(): boolean {
    if (!this.loginService.CrrentUser) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

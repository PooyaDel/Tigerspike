/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/model/user.model';
import { LoginService } from './login-service';
import { componentFactoryName } from '@angular/compiler';

describe('Service: AuthGaurd', () => {

  let mockedLoginService = jasmine.createSpyObj('mockedLoginService', {
    user: new BehaviorSubject<UserModel>(null),

  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService, { provide: LoginService, useValue: mockedLoginService }],
      imports: [RouterTestingModule, HttpClientModule]
    });
  });

  it('should return false if no user had logged in', inject([AuthGuardService], (service: AuthGuardService) => {
    localStorage.clear();
    expect(service.canActivate()).toBeFalsy();
  }));
});
;
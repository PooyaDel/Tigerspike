/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginService } from './login-service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [HttpClientModule]
    });
  });

  it('should do login successfully', inject([LoginService], (service: LoginService) => {
    spyOn(service.httpClient, 'post');
    service.login('uid', 'pwd');
    expect(service.httpClient.post).toHaveBeenCalled();
  }));

  it('should save the user in localStorage', inject([LoginService], (service: LoginService) => {
    localStorage.clear();
    const user = { name: 'name', userId: 'userId', email: 'e@mail.com' };
    service.currentUser = user;
    expect(service.user.value).toEqual(user);
    expect(service.currentUser).toEqual(user);
    expect(localStorage.user).toBeTruthy();
    expect(JSON.parse(localStorage.user)).toEqual(user);

  }));

});

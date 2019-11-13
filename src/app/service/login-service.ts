import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // the current user. Default is none until they login. Will let subscribers know as soon as user has logged in.
  user = new BehaviorSubject<UserModel>(null);

  constructor(public httpClient: HttpClient) { }
  // Calls to a Mocked login process on back-end. 
  login(userId: string, password: string): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${environment.baseUrl}/Auth`, { userId: userId, password: password });
  }

  public get currentUser(): UserModel {

    if (this.user.value) {
      return this.user.value;
    }
    // Saves user data in local cache.
    if (localStorage.user) {
      const user = JSON.parse(localStorage.user);
      this.user.next(user);
      return user;
    }
    return;
  }

  public set currentUser(result: UserModel) {
    this.user.next(result);
    localStorage.user = JSON.stringify(result);
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
  }

}

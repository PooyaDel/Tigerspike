import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  // Gets the land marks for all the users. 
  login(userId: string, password: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.baseUrl}/Auth`, { userId: userId, password: password });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkerModel } from 'src/model/marker.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// The user land marks operations.
export class UserLandmarkService {
  constructor(private httpClient: HttpClient) { }

  // Gets the land marks for all the users. 
  getMapLandmarks(): Observable<MarkerModel[]> {
    return this.httpClient.get<MarkerModel[]>(`${environment.baseUrl}/UserLandmark`);
  }
}

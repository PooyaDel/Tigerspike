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
  getMapLandmarks(userId: string): Observable<MarkerModel[]> {
    return this.httpClient.get<MarkerModel[]>(`${environment.baseUrl}/UserLandmark/${userId}`);
  }
  // Saves the land marks. 
  saveMapLandmarks(model: MarkerModel): Observable<MarkerModel> {
    return this.httpClient.post<MarkerModel>(`${environment.baseUrl}/UserLandmark`, model);
  }
}

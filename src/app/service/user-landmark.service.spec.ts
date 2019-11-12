/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserLandmarkService } from './user-landmark.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: UserLandmark', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLandmarkService], 
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([UserLandmarkService], (service: UserLandmarkService) => {
    expect(service).toBeTruthy();
  }));
});

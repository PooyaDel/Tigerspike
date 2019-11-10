/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserLandmarkService } from './user-landmark.service';

describe('Service: UserLandmark', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLandmarkService]
    });
  });

  it('should ...', inject([UserLandmarkService], (service: UserLandmarkService) => {
    expect(service).toBeTruthy();
  }));
});

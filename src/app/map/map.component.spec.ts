/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MapComponent } from './map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { UserLandmarkService } from '../service/user-landmark.service';
import { of, BehaviorSubject } from 'rxjs';
import { LoginService } from '../service/login-service';
import { UserModel } from 'src/model/user.model';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  let mockedLandmarkService = jasmine.createSpyObj('mockedLandmarkService', {
    getMapLandmarks: of([{
      lat: 1,
      lng: 1,
      text: 'text to search1',
      userId: '',
      userName: '',
      isOpen: false
    },
    {
      lat: 2,
      lng: 2,
      text: 'text to search2',
      userId: '',
      userName: '',
      isOpen: false
    }]),
    saveMapLandmarks: of({})
  });

  let mockedLoginService = jasmine.createSpyObj('mockedLoginService', {
    user: new BehaviorSubject<UserModel>({ name: 'name', email: 'e@mail.com', userId: 'uId' }),
    currentUser: { name: 'name', email: 'e@mail.com', userId: 'uId' }
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [GoogleMapsAPIWrapper, MapsAPILoader, { provide: UserLandmarkService, useValue: mockedLandmarkService }
        , { provide: LoginService, useValue: mockedLoginService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup form', () => {
    expect(component.formGroup).toBeTruthy('form group');
  });

  it('should save a position when clicking on the map and open dialog', () => {
    component.mapClicked({ coords: { lat: -1, lng: -2 } });
    expect(component.newLandMark).toBeTruthy();
    expect(component.newLandMark.lng).toBe(-2);
    expect(component.newLandMark.lat).toBe(-1);
    expect(component.displayNoteDialog).toBe(true);
  });

  it('should find and focus on a point if text contains the search phrase', () => {
    component.searchPhrase = 'text';
    //Mocking the map instance.
    component.map = {
      panTo: () => { }
    }
    spyOn(component.map, 'panTo');
    // Set all the markers to false.
    component.markers.forEach(m => (m.isOpen = false));
    component.searchMarkers();
    expect(component.markers[0].isOpen).toBe(true);
    expect(component.map.panTo).toHaveBeenCalledWith({ lat: component.markers[0].lat, lng: component.markers[0].lng });

    //If user searches again, they will see the next point.
    component.searchMarkers();
    expect(component.markers[1].isOpen).toBe(true);
    expect(component.map.panTo).toHaveBeenCalledWith({ lat: component.markers[1].lat, lng: component.markers[1].lng });

  });

  it('should should not save any location if no text value provided (invalid form)', () => {
    component.formGroup.controls.text.setValue(undefined);
    component.newLandMark = {
      lat: 1,
      lng: 2
    };

    component.saveLocationInfo();
    expect(mockedLandmarkService.saveMapLandmarks).not.toHaveBeenCalled();
  });

  it('should should save any location if text value provided', () => {
    component.formGroup.controls.text.setValue('testing');
    component.newLandMark = {
      lat: 1,
      lng: 2
    };

    component.saveLocationInfo();
    // testing cleanup function.
    expect(mockedLandmarkService.saveMapLandmarks).toHaveBeenCalled();
    //Reset the apy call so that regardless of how the run order is it will pass.
    mockedLandmarkService.saveMapLandmarks.calls.reset();
  });

});

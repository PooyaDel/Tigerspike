import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { MarkerModel } from 'src/model/marker.model';
import { UserLandmarkService } from '../service/user-landmark.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from '../service/login-service';
import { GoogleMapsAPIWrapper, AgmMap, AgmInfoWindow } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MessageService]

})
export class MapComponent implements OnInit, AfterViewInit {

  latitude: number;
  longitude: number;
  zoom: number;
  displayNoteDialog: boolean;
  error: boolean;
  // All the markers retrieved from DB
  markers: MarkerModel[] = [];
  // Messages to display if required.
  msgs = [];
  searchPhrase = '';
  newLandMark: MarkerModel;

  // Current map instance.
  map: any;
  //Dependency injections (by order) :Landmark service operations, Angular form builder, messaging service to show information to user as pop-ups etc.., login service to get current user info
  // and google api wrapper to use for operations on the map
  constructor(private userLandmarkService: UserLandmarkService, private formBuilder: FormBuilder,
    private messageService: MessageService, private loginService: LoginService, public gMaps: GoogleMapsAPIWrapper) { }
  formGroup: FormGroup;

  //Gets the instance of the map on this page.
  @ViewChild(AgmMap, { static: true }) agmMap;

  ngOnInit() {
    this.setupForm();
    this.setCurrentLocation();
    this.gMaps.getNativeMap().then((map) => {
      this.map = map;
      this.map.setMapOptions({ streetViewControl: false });
    });

    //  
    // Retrieve all the points.
    this.userLandmarkService.getMapLandmarks(this.loginService.currentUser.userId).subscribe(result => (this.markers = result));
  }

  get currentUserId() {
    return this.loginService.user.value.userId;
  }
  ngAfterViewInit() {

    // Gets the instance of current map if available.
    if (this.agmMap) {
      this.agmMap.mapReady.subscribe(map => {
        this.map = map;
      });
    }
  }

  setupForm() {
    this.formGroup = this.formBuilder.group({
      text: [undefined, Validators.required],
    });
  }

  // Get Current Location Coordinates of the user.
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  // opens a dialog for user to add their notes for that location and also updates the current location selected which is needed for when they submit the information.
  mapClicked(event: any) {
    // Show the popup menu.
    this.displayNoteDialog = true;

    //Save the clicked location,
    this.newLandMark = {
      lat: event.coords.lat,
      lng: event.coords.lng
    };
  }

  saveLocationInfo() {

    if (!this.formGroup.valid) {
      this.error = true;
      return;
    }

    // Do we have allocation saved ? If not, warn users and return.
    if (!this.newLandMark || !this.newLandMark.lat || !this.newLandMark.lng) {
      // clears all the existing messages on the page and show the following message in the middle of the page.
      this.messageService.clear();
      this.messageService.add({ key: 'tc', life: 1000, severity: 'warning', summary: 'No coordinates found!', detail: `Please click on a location on the map.` });
      return;
    }

    // Update the text and user ID 
    this.newLandMark.text = this.formGroup.controls.text.value;
    this.newLandMark.userId = this.loginService.currentUser.userId;

    this.userLandmarkService.saveMapLandmarks(this.newLandMark).subscribe(result => {
      // Add the marker only if the save operation was successful.
      this.markers.push(result);
      this.messageService.clear();
      this.messageService.add({ key: 'tc', life: 1000, severity: 'info', summary: 'Location saved!' });

    });

    this.cleanUpForm();
  }

  private cleanUpForm() {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', life: 1000, severity: 'info', summary: 'Successful!', detail: `Note '${this.formGroup.controls.text.value}' saved successfully.` });
    this.formGroup.reset();
    this.formGroup.markAsPristine();
    this.displayNoteDialog = false;
  }

  // Searches for all the matching points and open show the message one by one (until user decided to close them);
  searchMarkers() {
    const markerFound = this.markers.find(x => !x.isOpen && x.text.toLowerCase().includes(this.searchPhrase.toLowerCase()));
    if (!markerFound) {
      return;
    }
    this.map.panTo({ lat: markerFound.lat, lng: markerFound.lng });
    this.markers.find(m => m === markerFound).isOpen = true;
  }

  // Updates the markers so that user can go back to whatever they closed.
  updateMarker(value: MarkerModel) {
    this.markers.find(x => x === value).isOpen = false;
  }

}

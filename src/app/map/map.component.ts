import { Component, OnInit } from '@angular/core';
import { MarkerModel } from 'src/model/marker.model';
import { UserLandmarkService } from '../service/user-landmark.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from '../service/login-service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MessageService]

})
export class MapComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number;
  display: boolean;
  error: boolean;
  markers: MarkerModel[] = [];
  msgs = [];

  newLandMark: MarkerModel;
  //Dependency injections (by order) :Landmark service operations, Angular form builder, messaging service to show information to user as pop-ups etc..
  constructor(private userLandmarkService: UserLandmarkService, private formBuilder: FormBuilder,
    private messageService: MessageService, private loginService: LoginService) { }
  formGroup: FormGroup;
  ngOnInit() {
    this.setupForm();
    this.setCurrentLocation();
    // Retreive all the points.
    this.userLandmarkService.getMapLandmarks(this.loginService.CrrentUser.userId).subscribe(result => (this.markers = result));
  }

  get currentUserId() { 
    return this.loginService.user.value.userId;
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

  // opens a dialog for user to add their notes for that location and also updates the current location selected whicch is needed for when they submit the information.
  mapClicked(event: any) {
    // Show the popup menu.
    this.display = true;

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

    // Do we have alocation saved ? If not, warn users and return.
    if (!this.newLandMark || !this.newLandMark.lat || !this.newLandMark.lng) {
      // clears all the existing messages on the page and show the following message in the middle of the page.
      this.messageService.clear();
      this.messageService.add({ key: 'tc', life: 1000, severity: 'warning', summary: 'No coodirates found!', detail: `Please click on a location on the map.` });
      return;
    }

    // Update the text and user ID 
    this.newLandMark.text = this.formGroup.controls.text.value;
    this.newLandMark.userId = this.loginService.CrrentUser.userId;

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
    this.messageService.add({ key: 'tc', life: 1000, severity: 'info', summary: 'Successful!', detail: `Note '${this.formGroup.controls.text.value}' saved successfull.` });
    this.formGroup.reset();
    this.formGroup.markAsPristine();
    this.display = false;
  }
}

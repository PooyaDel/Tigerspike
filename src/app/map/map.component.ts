import { Component, OnInit } from '@angular/core';
import { MarkerModel } from 'src/model/marker.model';
import { UserLandmarkService } from '../service/user-landmark.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MessageService]

})
export class MapComponent implements OnInit {


  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  display: boolean;
  error: boolean;
  markers: MarkerModel[] = [];
  msgs = [];

  currentLocation: MarkerModel;
  // @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow
  constructor(private userLandmarkService: UserLandmarkService, private formBuilder: FormBuilder,
    private messageService: MessageService) { }
  formGroup: FormGroup;
  ngOnInit() {
    this.setupForm();


    this.setCurrentLocation();
    this.userLandmarkService.getMapLandmarks().subscribe(result => (this.markers = result));
  }

  setupForm() {
    this.formGroup = this.formBuilder.group({
      text: [undefined, Validators.required],
    });

  }


  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  mapClicked(event: any) {
    this.error = false;

    this.display = true;
    this.currentLocation = {
      lat: event.coords.lat,
      lng: event.coords.lng
    };
    // this.markers.push({
    //   text: 'Some text',
    //   title: 'Title'
    // });
  }

  saveLocationInf() {
    if (!this.formGroup.valid) {
      this.formGroup.markAsPristine();
      this.formGroup.markAsUntouched();
      this.error = true;
      return;
    }

    this.cleanUpForm();
  }

  private cleanUpForm() {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', life: '1000', severity: 'info', summary: 'Successful!', detail: `Note '${this.formGroup.controls.text.value}' saved successfull.` });
    this.formGroup.patchValue({ text: '' });
    this.formGroup.markAsPristine();
    this.display = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { MarkerModel } from 'src/model/marker.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  markers: MarkerModel[] = [];
  // @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  ngOnInit() {
    this.setCurrentLocation();
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
    this.markers.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
      text: 'Some text',
      title: 'Title'

    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];

  constructor() { }
  showLinks = false;
  ngOnInit() {

    this.items = [{
      label: 'User',
      items: [
        { label: 'Login', icon: 'pi pi-user', url: '/login' },
        { label: 'Map', icon: 'pi pi-map-marker', url: '/map' }
      ]
    }];
  }

}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthGaurdService } from 'src/auth-gaurd.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];

  constructor(private authGaurdService: AuthGaurdService) { }
  showLinks = false;
  ngOnInit() {

    this.items = [{
      label: 'User',
      items: [
        { label: 'Login', icon: 'pi pi-user', url: '/login' },
        { label: 'Map', icon: 'pi pi-map-marker', url: '/map' },
        { label: 'Log out', separator: true },
        { label: 'Log out', command: () => this.authGaurdService.isAuthenticated.next(false), icon: 'pi pi-map-marker', url: '/map' },
      ]
    }];
  }
}

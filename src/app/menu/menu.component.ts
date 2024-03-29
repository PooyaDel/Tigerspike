import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../service/login-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];

  constructor(private loginService: LoginService) { }
  showLinks = false;
  ngOnInit() {

    this.items = [{
      label: 'User',
      items: [
        { label: 'Login', icon: 'pi pi-sign-in', url: '/login' },
        { label: 'Map', icon: 'pi pi-map-marker', url: '/map' },
        { separator: true },
        { label: 'Log out', command: () => this.loginService.logout(), icon: 'pi pi-sign-out', url: '/map' },
      ]
    }];
  }
}

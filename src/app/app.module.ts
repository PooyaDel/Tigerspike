import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MenuComponent } from './menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';

@NgModule({
   declarations: [
      AppComponent,
      MenuComponent,
      LoginComponent,
      MapComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FontAwesomeModule,
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyCxf3dLog6kjurQ2olS6SL2GszLUKBbK8c',
         libraries: ['places']
      })],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }

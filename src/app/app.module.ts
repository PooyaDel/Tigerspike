import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MenuComponent } from './menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserLandmarkService } from './service/user-landmark.service';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AuthGuardService } from 'src/app/service/auth-guard.service';
import { LoginService } from './service/login-service';

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
      HttpClientModule,
      FontAwesomeModule,
      InputTextModule,
      DialogModule,
      ReactiveFormsModule,
      MessagesModule,
      MessageModule,
      MenuModule,
      ToastModule,
      ButtonModule,
      FormsModule,
      BrowserAnimationsModule,
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyCxf3dLog6kjurQ2olS6SL2GszLUKBbK8c',
         libraries: ['places']
      })],
   providers: [UserLandmarkService, AuthGuardService, LoginService, GoogleMapsAPIWrapper],
   bootstrap: [AppComponent]
})
export class AppModule { }

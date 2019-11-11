import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from '../service/login-service';
import { AuthGaurdService } from 'src/auth-gaurd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  error: boolean;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private loginService: LoginService, private authGaurdService: AuthGaurdService, private router: Router) { }

  ngOnInit() {
    this.setupForm();

  }

  setupForm() {
    this.formGroup = this.formBuilder.group({
      userId: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }
  
  // Similautes a login process
  login() {

    if (!this.formGroup.valid) {
      this.error = true;
      return;
    }


    this.loginService.login(this.formGroup.controls.userId.value, this.formGroup.controls.password.value).subscribe(result => {
      // If successed, update the status of the user for the whole application. 
      this.authGaurdService.isAuthenticated.next(result);
      this.router.navigate(['map']);
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'Succsess', summary: 'Redirecting...', detail: `` });
      // Cleanup the form.
      this.cleanUpForm();

    }, err => {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'Error', summary: 'Login process failed.', detail: `Please see the console log for details.` });
      // Logs error on console (if any);
      console.log(JSON.stringify(err));
    });
  }

  //Cleans up the form after use.
  private cleanUpForm() {
    this.formGroup.reset();
    this.formGroup.markAsPristine();
  }


}

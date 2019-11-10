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

  login() {
    if (!this.formGroup.valid) {
      this.formGroup.markAsPristine();
      this.formGroup.markAsUntouched();
      this.error = true;
      return;
    }

    this.loginService.login(this.formGroup.controls.userId.value, this.formGroup.controls.password.value).subscribe(result => {
      this.authGaurdService.isAuthenticated.next(result);
      this.router.navigate(['map']);

    }, err => (console.log(JSON.stringify(err))));

    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Invalid login!', detail: `` });

    // this.cleanUpForm();
  }

  private cleanUpForm() {
    this.formGroup.patchValue({ userId: '', password: '' });
    this.formGroup.markAsPristine();
  }


}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private notification: NzNotificationService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false),
    });
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      const rememberMe = this.loginForm.get('rememberMe')?.value;

      const user = this.usersService.findUserByEmailAndPassword(
        email,
        password
      );

      if (user) {
        //tests if the user exists in local storage from service

        if (rememberMe) {
          this.usersService.setLoggedInUser(user); // remember the user
        }

        this.router.navigate(['/trips']);
        this.notification.success('Success', 'User login successfully.');
      } else {
        this.notification.error('Failed', 'User not found.');
      }
    }
  }
}

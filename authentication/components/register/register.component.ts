import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { PasswordMatchValidator } from 'src/authentication/validators/PasswordMatchValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private userService: UsersService,
    private notification: NzNotificationService
  ) {
    this.registrationForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        passwordConfirmation: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
      },
      { validators: PasswordMatchValidator.validate }
    );
  }

  register() {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.get('email')?.value;
      const password = this.registrationForm.get('password')?.value;
      const name = this.registrationForm.get('name')?.value;
      const surname = this.registrationForm.get('surname')?.value;

      const newUser: User = { email, password, name, surname };

      const isUserAdded = this.userService.addUser(newUser);
      if (isUserAdded) {
        this.notification.success('Success', 'User registred successfully.');
      } else {
        this.notification.error('Failed', 'User already exists.');
      }
    }
  }
}

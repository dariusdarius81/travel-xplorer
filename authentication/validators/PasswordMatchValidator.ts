import { AbstractControl, ValidatorFn } from '@angular/forms';

export class PasswordMatchValidator {
  static validate: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('passwordConfirmation')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
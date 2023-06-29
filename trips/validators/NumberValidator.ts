import { AbstractControl, ValidatorFn } from "@angular/forms";

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    
    if (isNaN(value)) {
      return { 'number': true }; //return error
    }
    return null; //return null if it's a number
  };
}
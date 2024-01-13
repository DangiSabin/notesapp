import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from 'src/app/shared/user';

export function confrimFunction(): ValidatorFn {
  return function (control): ValidationErrors | null {
    let err = null;
    if (control.value.password !== control.value.confirm) {
      err = { confirm: false };
    }
    return err;
  };
}

export function uniqueFunction(usersList: User[]): ValidatorFn {
  return  (control): ValidationErrors | null =>{
    let err = null;
    usersList.map((user) => {
      if (user.username === control.value) {
        err = { unique: false };
      }
    });
    
    return err;
  };
}

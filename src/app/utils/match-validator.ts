import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchValidator(
  control: AbstractControl,
  controlTwo: AbstractControl
): ValidatorFn {
  return () => {
    if (control.value !== controlTwo.value)
      return { match_error: 'Value does not match' };
    return null;
  };
}

export function toAngularValidator(
  errorKey: string,
  validationFn: (str: string, ...args: any[]) => boolean,
  ...rest: any[]
): ValidatorFn {
  return (control: AbstractControl) => {
    const condition = control.value && !validationFn(control.value, ...rest);

    return condition ? { [errorKey]: condition } : null;
  };
}

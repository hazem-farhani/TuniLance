import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passConfirm = control.get('passConfirm');
	console.log(password.value);
	console.log(passConfirm.value);
  return password && passConfirm && password.value !=  passConfirm.value ? { 'passwordsMatch': false } : null;
};
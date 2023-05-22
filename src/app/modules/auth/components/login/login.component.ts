import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  alreadySubmitted: boolean = false;
  isPasswordVisible: boolean = false;
  faOpenEye = faEye;
  faCloseEye = faEyeSlash;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    rememberMe: new FormControl(false),
  });

  constructor(private readonly authService: AuthService) {
    const { email, password } = this.authService.getRememberedCredentials();
    this.loginForm.patchValue({ email, password, rememberMe: !!email });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    this.alreadySubmitted = true;
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.email?.value as string,
          this.password?.value as string,
          this.rememberMe?.value as boolean
        )
        .subscribe((response) => {
          console.log(response);
        });
    }
  }
}

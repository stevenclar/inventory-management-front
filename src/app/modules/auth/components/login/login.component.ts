import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  alreadySubmitted: boolean = false;
  isLoading: boolean = false;
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

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    const { email, password } = this.authService.getRememberedCredentials();
    this.loginForm.patchValue({ email, password, rememberMe: !!email });
  }

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe') as FormControl;
  }

  onSubmit() {
    this.alreadySubmitted = true;
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.email?.value as string,
          this.password?.value as string,
          this.rememberMe?.value as boolean
        )
        .subscribe(
          () => {
            this.isLoading = false;
            this.router.navigate(['/dashboard/companies']);
          },
          () => (this.isLoading = false),
          () => (this.isLoading = false)
        );
    }
  }
}

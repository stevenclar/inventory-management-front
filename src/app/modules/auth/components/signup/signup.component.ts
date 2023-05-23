import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { toAngularValidator } from 'src/app/utils/match-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  alreadySubmitted: boolean = false;
  isLoading: boolean = false;

  signupForm: FormGroup;

  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  termsAndCondition: FormControl;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.firstName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.lastName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    (this.email = new FormControl('', [Validators.required, Validators.email])),
      (this.password = new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]));
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    (this.termsAndCondition = new FormControl(false)),
      (this.signupForm = new FormGroup(
        {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          termsAndCondition: this.termsAndCondition,
        },
        toAngularValidator(
          'match',
          () => this.password?.value === this.confirmPassword?.value
        )
      ));
  }

  get hasMatchError() {
    return this.signupForm.hasError('match');
  }

  onSubmit() {
    this.alreadySubmitted = true;
    if (this.signupForm.valid) {
      if (this.termsAndCondition?.value) {
        this.isLoading = true;
        this.authService
          .signup(
            this.firstName?.value as string,
            this.lastName?.value as string,
            this.email?.value as string,
            this.password?.value as string
          )
          .subscribe(
            () => {
              this.isLoading = false;
              this.router.navigate(['/dashboard']);
            },
            () => (this.isLoading = false),
            () => (this.isLoading = false)
          );
      }
    }
  }
}

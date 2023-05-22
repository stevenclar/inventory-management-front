import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() alreadySubmitted: boolean = false;
  @Input() type!: 'text' | 'password' | 'textarea';
  @Input() labelText: string = 'text';
  @Input() placeHolder: string = 'text';
  @Input() control!: FormControl;
  @Input() controlName: string = 'control';
  @Input() classWrapper: string = 'w-full';

  faOpenEye = faEye;
  faCloseEye = faEyeSlash;

  isPasswordVisible: boolean = false;
  inputType: string = 'text';

  ngOnInit() {
    switch (this.type) {
      case 'text':
        this.inputType = 'text';
        break;
      case 'password':
        this.inputType = 'password';
        break;
      default:
        this.inputType = 'text';
        break;
    }
  }

  get isInvalid() {
    return (
      this.control.errors &&
      this.alreadySubmitted &&
      (this.control.dirty || this.control.touched)
    );
  }

  get isPasswordField() {
    return this.type === 'password';
  }

  get isTextAreaField() {
    return this.type === 'textarea';
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    if (this.isPasswordVisible) {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }
}

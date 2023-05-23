import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { SelectOption } from 'src/app/core/interfaces/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() alreadySubmitted: boolean = false;
  @Input() labelText: string = 'text';
  @Input() placeHolder: string = 'text';
  @Input() control!: FormControl;
  @Input() controlName: string = 'control';
  @Input() classWrapper: string = 'w-full';
  @Input() selectOptions: SelectOption[] = [];

  faOpenEye = faEye;
  faCloseEye = faEyeSlash;

  isPasswordVisible: boolean = false;

  get isInvalid() {
    return (
      this.control.errors &&
      this.alreadySubmitted &&
      (this.control.dirty || this.control.touched)
    );
  }
}

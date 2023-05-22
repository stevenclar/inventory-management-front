import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() alreadySubmitted: boolean = false;
  @Input() type: string = 'text';
  @Input() labelText: string = 'text';
  @Input() placeHolder: string = 'text';
  @Input() control!: FormControl;
  @Input() controlName: string = 'control';
  @Input() classWrapper: string = 'w-full';

  get isInvalid() {
    return (
      this.control.errors &&
      this.alreadySubmitted &&
      (this.control.dirty || this.control.touched)
    );
  }
}

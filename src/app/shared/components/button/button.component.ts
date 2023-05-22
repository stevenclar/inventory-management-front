import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() isFullWidth: boolean = false;
  @Input() text: string = '';
  @Input() icon: FaIconComponent | null = null;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  handleClick() {
    this.onClick.emit();
  }
}

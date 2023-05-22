import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appErrorValidation]',
})
export class ErrorValidationDirective implements OnInit {
  @Input('appErrorValidation') control!: AbstractControl | null;
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.control?.statusChanges.subscribe(() => {
      this.updateView();
    });
  }

  private updateView() {
    if (
      this.control &&
      this.control.invalid &&
      this.control.errors &&
      (this.control.dirty || this.control.touched)
    ) {
      const errorKey = Object.keys(this.control.errors)[0];
      const translatedMessage = this.translate.instant(
        `form.errorMessages.${errorKey}`,
        this.getInterpolateParams(errorKey)
      );

      if (!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef, {
          error: translatedMessage,
        });
        this.hasView = true;
      } else {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef, {
          error: translatedMessage,
        });
      }
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  private getInterpolateParams(errorKey: string) {
    switch (errorKey) {
      case 'minlength' || 'maxlength':
        return {
          requiredLength: this.control?.errors?.[errorKey]?.requiredLength,
        };
      default:
        return {};
    }
  }
}

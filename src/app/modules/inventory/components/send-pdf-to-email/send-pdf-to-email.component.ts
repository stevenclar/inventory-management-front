import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from 'src/app/core/services/company/company.service';
import { CreateInventoryComponent } from '../create-inventory/create-inventory.component';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-send-pdf-to-email',
  templateUrl: './send-pdf-to-email.component.html',
})
export class SendPdfToEmailComponent {
  alreadySubmitted: boolean = false;
  isLoading: boolean = false;
  email: FormControl;
  sendPdfForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public nit: string,
    private readonly companyService: CompanyService,
    private readonly alertService: AlertService,
    private readonly translateService: TranslateService
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.sendPdfForm = new FormGroup({
      email: this.email,
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.companyService
      .sendInventoryToEmail(this.nit, this.email.value)
      .subscribe(
        (response) => {
          this.alertService.showToast(
            this.translateService.instant('common.success'),
            'top'
          );
          this.isLoading = false;
          this.dialogRef.close(response);
        },
        () => (this.isLoading = false),
        () => (this.isLoading = false)
      );
  }
}

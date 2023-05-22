import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import Company from 'src/app/core/interfaces/company';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { CompanyService } from 'src/app/core/services/company/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
})
export class EditCompanyComponent {
  companyForm: FormGroup;

  name: FormControl;
  description: FormControl;
  address: FormControl;
  phone: FormControl;

  alreadySubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public company: Company,
    private readonly companyService: CompanyService,
    private readonly alertService: AlertService,
    private readonly translateService: TranslateService
  ) {
    this.name = new FormControl(this.company.name, [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.description = new FormControl(this.company.description, [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.address = new FormControl(this.company.address, [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.phone = new FormControl(this.company.phone, [
      Validators.required,
      Validators.minLength(3),
    ]);

    this.companyForm = new FormGroup({
      name: this.name,
      description: this.description,
      address: this.address,
      phone: this.phone,
    });
  }

  onSubmit() {
    this.alreadySubmitted = true;
    if (this.companyForm.valid) {
      this.isLoading = true;
      this.companyService
        .updateCompany(this.company.nit, this.companyForm.value)
        .subscribe(
          (response) => {
            this.alertService.showToast(
              this.translateService.instant('company.updated', {
                nit: this.company.nit,
              }),
              'top'
            );
            this.dialogRef.close(response);
            this.isLoading = false;
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          }
        );
    }
  }
}

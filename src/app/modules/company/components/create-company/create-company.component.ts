import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from 'src/app/core/services/company/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
})
export class CreateCompanyComponent {
  companyForm: FormGroup;

  nit: FormControl;
  name: FormControl;
  description: FormControl;
  address: FormControl;
  phone: FormControl;

  alreadySubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateCompanyComponent>,
    private readonly companyService: CompanyService
  ) {
    this.nit = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.description = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.address = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.phone = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);

    this.companyForm = new FormGroup({
      nit: this.nit,
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
      this.companyService.createCompany(this.companyForm.value).subscribe(
        (response) => {
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

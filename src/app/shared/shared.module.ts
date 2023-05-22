import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorValidationDirective } from './directives/error-validation/error-validation.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FilterByPipe,
    ErrorValidationDirective,
    ButtonComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    TranslateModule,
    MatDialogModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    FontAwesomeModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FilterByPipe,
    ErrorValidationDirective,
    MatDialogModule,
    InputComponent,
    ButtonComponent,
  ],
})
export class SharedModule {}

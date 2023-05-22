import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FilterByPipe } from './pipes/filter-by.pipe';

@NgModule({
  declarations: [NavbarComponent, FilterByPipe],
  imports: [CommonModule, FontAwesomeModule, HttpClientModule, TranslateModule],
  exports: [NavbarComponent, FontAwesomeModule, HttpClientModule, TranslateModule, FilterByPipe],
})
export class SharedModule {}

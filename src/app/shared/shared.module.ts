import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, FilterByPipe],
  imports: [CommonModule, FontAwesomeModule, HttpClientModule, TranslateModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    FontAwesomeModule,
    HttpClientModule,
    TranslateModule,
    FilterByPipe,
  ],
})
export class SharedModule {}

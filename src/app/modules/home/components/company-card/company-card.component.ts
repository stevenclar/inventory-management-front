import { Component, Input } from "@angular/core";
import Company from "src/app/core/interfaces/company";

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
})
export class CompanyCardComponent {
  @Input() company: Company | undefined;
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  faLogout = faSignOutAlt;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

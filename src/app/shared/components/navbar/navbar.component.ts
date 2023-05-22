import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(
    private readonly authService: AuthService,
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  goToProfile() {
    // Redirigir al usuario a la página de perfil
  }

  goToLogin() {
    // Redirigir al usuario a la página de inicio de sesión
  }
}

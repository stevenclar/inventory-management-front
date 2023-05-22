import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkAuthStatus();
  }

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

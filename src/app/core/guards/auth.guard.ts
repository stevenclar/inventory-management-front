import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  canActivate() {
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}

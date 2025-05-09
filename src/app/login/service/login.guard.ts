import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // If the user is already logged in, redirect them to the appropriate dashboard
    if (this.authService.isLoggedIn()) {
      const userType = this.authService.getUserRole();

      switch (userType) {
        case 'admin':
          this.router.navigate(['/a']);
          break;
        case 'user':
          this.router.navigate(['/u']);
          break;
        default:
          this.router.navigate(['/access-denied']);
          break;
      }

      return false; // Prevent access to the login page
    }

    // User not logged in — allow access to the login page
    return true;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  errorMessage = '';
  loading = false;
  loadingMessage = "Sign In";

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) return 'Password is required';
    return this.password.hasError('minlength') ? 'Password should be at least 8 characters long' : '';
  }

  getErrorMessage() {
    if (this.email.hasError('required')) return 'Email is required';
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
    if (this.email.valid && this.password.valid) {
      this.loading = true;
      this.loadingMessage = "Signing in...";

      const loginData = {
        email: this.email.value,
        password: this.password.value
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.snackBar.open('Login successful!', 'Dismiss', { duration: 2000 });
          setTimeout(() => {
            this.checkUserRoleAndRedirect();
          }, 500);
        },
        error: (error) => {
          this.snackBar.open(
            error.error.message || 'Login failed. Please try again.',
            'Dismiss',
            { duration: 3000 }
          );
          this.errorMessage = error.error.message || '';
          this.loading = false;
          this.loadingMessage = "Sign In";
        }
      });
    }
  }

  checkUserRoleAndRedirect(retries: number = 3) {
    const role = this.authService.getUserRole();

    if (role) {
      if (role === 'admin') {
        this.router.navigate(['/a/dashboard']);
      } else {
        this.router.navigate(['/u/dashboard']);
      }
    } else if (retries > 0) {
      setTimeout(() => {
        this.checkUserRoleAndRedirect(retries - 1);
      }, 500);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
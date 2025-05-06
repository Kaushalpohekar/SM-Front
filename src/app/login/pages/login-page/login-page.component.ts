import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,Validators } from '@angular/forms';




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
  loading: boolean = false;
  loadingMessage: string = "Sign In";
  UserId!: string;

  constructor(
    private router: Router ) { }


  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }
    return this.password.hasError('minlength')
      ? 'Password should be at least 8 characters long'
      : '';
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
    // if (this.email.valid && this.password.valid) {
    //   this.loading = true;
    //   this.loadingMessage = "Signing in...";
  
    //   const loginData = {
    //     Username: this.email.value,
    //     Password: this.password.value
    //   };
  
    //   this.authService.login(loginData).subscribe(
    //     (response) => {
    //       const token = response.token;
    //       const encrypttoken = this.encryptionservice.encryptData(token);
    //       this.cookieservice.set('token', encrypttoken); // Store token in cookies
  
    //       // Fetch user details and redirect
    //       this.authService.getuserdetails(token).subscribe(
    //         (userDetails) => {
    //           const role = this.encryptionservice.encryptData(userDetails.Role);
    //           const email = this.encryptionservice.encryptData(userDetails.Email);
    //           this.cookieservice.set('role',role);
    //           this.cookieservice.set('user_email',email);
    //           this.router.navigate(['/admin/dashboard']); 
    //           // Redirect to Admin Dashboard
    //         },
    //         (error) => {
    //           console.error('Error fetching user details:', error);
    //           this.router.navigate(['/login']);
    //         }
    //       );
  
    //       this.snackBar.open('Login successful!', 'Dismiss', { duration: 2000 });
    //     },
    //     (error) => {
    //       this.snackBar.open(
    //         error.error.message || 'Login failed. Please try again.',
    //         'Dismiss',
    //         { duration: 2000 }
    //       );
    //       this.errorMessage = error.error.message || '';
    //       this.loading = false;
    //       this.loadingMessage = "Sign In";
    //     }
    //   );
    // }
  }
  

  checkUserTypeAndRedirect(retries: number = 3) {
    // const userType = this.authService.getUserType();
    
    // if (userType) {
    //   this.redirectUser(userType);
    // } else if (retries > 0) {
    //   setTimeout(() => {
    //     this.checkUserTypeAndRedirect(retries - 1);
    //   }, 500);
    // } else {
    //   console.log('Unable to fetch user type after multiple attempts');
    //   this.router.navigate(['/login']);
    // }
  }


}
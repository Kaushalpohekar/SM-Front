import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/environment/environment.prod';
import { SecureCookieService } from 'src/app/service/secure.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private secureCookieService: SecureCookieService,
    private cookieService: CookieService
  ) {}

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, loginData);
  }

  register(registerData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, registerData);
  }

  updateUser(id: string, updateData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.put(`${this.API_URL}/auth/user/${id}`, updateData, { headers });
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setUserRole(role: string) {
    this.secureCookieService.setEncryptedCookie('_USR_ROLE', role, 1);
  }

  getUserRole(): string | null {
    return this.secureCookieService.getDecryptedCookie('_USR_ROLE');
  }

  setDestination(destinationId: string) {
    this.secureCookieService.setEncryptedCookie('_USR_DEST', destinationId, 1);
  }

  getDestination(): string | null {
    return this.secureCookieService.getDecryptedCookie('_USR_DEST');
  }

  setToken(token: string): void {
    this.secureCookieService.setEncryptedCookie('_AUTH_TOKEN', token, 1);
    this.getUserDetails();
  }

  getToken(): string | null {
    return this.secureCookieService.getDecryptedCookie('_AUTH_TOKEN');
  }

  logout(): void {
    const allCookies = this.cookieService.getAll();
    for (const cookieName of Object.keys(allCookies)) {
      this.cookieService.delete(cookieName, '/');
    }
    window.location.href = '/login';
  }

  getUserDetails(): void {
    const token = this.getToken();
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(`${this.API_URL}/auth/user`, { headers }).subscribe({
      next: (user: any) => {
        if (user?.user) {
          this.setUserRole(user.user.role);
          this.setDestination(user.user.destination_id);
          this.secureCookieService.setEncryptedCookie('_USR_ID', user.user.user_id, 1);
        }
      },
      error: (err) => {
        console.error('Failed to fetch user details:', err);
      }
    });
  }
}

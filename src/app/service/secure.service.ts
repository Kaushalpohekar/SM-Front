import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from './encrypt.service';


@Injectable({
  providedIn: 'root'
})
export class SecureCookieService {
  constructor(private cookieService: CookieService, private encryptService: EncryptService) {}

  setEncryptedCookie(name: string, value: any, daysToExpire: number = 1): void {
    const encryptedValue = this.encryptService.encryptData(value);
    const expiryDate = new Date();
    //expiryDate.setDate(expiryDate.getDate() + daysToExpire);
    expiryDate.setTime(expiryDate.getTime() + daysToExpire * 60 * 60 * 1000);

    this.cookieService.set(name, encryptedValue, {
      expires: expiryDate,
      path: '/',
      secure: true,
      sameSite: 'Strict'
    });
  }

  getDecryptedCookie(name: string): any {
    const encryptedValue = this.cookieService.get(name);
    return encryptedValue ? this.encryptService.decryptData(encryptedValue) : null;
  }

  deleteCookie(name: string): void {
    this.cookieService.delete(name, '/');
  }
}

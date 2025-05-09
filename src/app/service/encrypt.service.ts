import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../environment/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  private secretKey = environment.secretKey;

  constructor() { }

  encryptData(data: any): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    return encryptedData;
  }

  decryptData(encryptedData: string): any {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, this.secretKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }
}

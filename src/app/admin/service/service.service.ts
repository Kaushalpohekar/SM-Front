import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly API_URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getMessages(startUtc: string, endUtc: string): Observable<any> {
    const body = { start_utc: startUtc, end_utc: endUtc };
    return this.http.post(this.API_URL + '/msg/messages', body);
  }

  getForwardMessages(startUtc: string, endUtc: string): Observable<any> {
    const body = { start_utc: startUtc, end_utc: endUtc };
    return this.http.post(this.API_URL + '/msg/forward', body);
  }
}

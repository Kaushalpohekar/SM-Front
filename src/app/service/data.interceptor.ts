import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SecureCookieService } from 'src/app/service/secure.service';

@Injectable()
export class DataInterceptor implements HttpInterceptor {
  constructor(private secureCookieService: SecureCookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.secureCookieService.getDecryptedCookie('_AUTH_TOKEN') ?? null;

    const excludedUrls = [
      '/login',
      '/register',
    ];

    const isExcluded = excludedUrls.some((url) => {
      const regex = new RegExp(url.replace(/:\w+/g, '\\w+'), 'i');
      return regex.test(request.url);
    });

    if (token && !isExcluded) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
    }

    return next.handle(request).pipe(
      tap({
        next: (event) => ('') ,
        error: (err) => console.error('API Error:', err),
      })
    );
  }
}

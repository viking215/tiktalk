import { CookieService } from 'ngx-cookie-service';
import { catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenResponse } from '../data/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  token: string | null = null;
  refresh_token: string | null = null;
  cookieService = inject(CookieService);
  router = inject(Router);

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refresh_token = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const formData = new FormData();

    formData.append('username', payload.username);
    formData.append('password', payload.password);

    return this.http
      .post<TokenResponse>(this.baseApiUrl + 'auth/token', formData)
      .pipe(tap((val) => this.saveTokens(val)));
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(this.baseApiUrl + 'auth/refresh', {
        refresh_token: this.refresh_token,
      })
      .pipe(
        tap((res) => this.saveTokens(res)),
        catchError((error) => {
          this.logout();
          return throwError(error);
        })
      );
  }

  logout() {
    return this.http.post(this.baseApiUrl + 'auth/logout', {}).subscribe(() => {
      this.cookieService.delete('token');
      this.cookieService.delete('refreshToken');
      this.token = null;
      this.refresh_token = null;
      this.router.navigate(['/login']);
    });
  }

  saveTokens = (res: TokenResponse) => {
    this.token = res.access_token;
    this.refresh_token = res.refresh_token;
    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refresh_token);
  };
}

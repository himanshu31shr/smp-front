import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthToken } from '../models/auth-token.model';
import { BaseResponse } from '../models/base-response.model';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string) {
    return this.http.post<BaseResponse<AuthToken>>('auth/login', {
      email, password
    });
  }

  register(email: string, password: string, name: string) {
    return this.http.post<BaseResponse<RegisterModel>>('auth/register', {
      email, password, name
    });
  }

  authenticate(data: AuthToken) {
    localStorage.setItem('access_token', data.token);
    localStorage.setItem('refresh_token', data.refresh);
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  isAuth() {
    const token = this.getToken();
    return !!token;
  }
}

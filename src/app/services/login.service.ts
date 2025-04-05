import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../../models/LoginCredentials.type';
import { LoginResponse } from '../../models/LoginResponse.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/api/users/login';
  handleLogin(credentials: LoginCredentials) {
    return this.http.post<LoginResponse>(this.apiUrl, credentials);
  }
}

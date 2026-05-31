import {inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest{
  username: string;
  pass: string;
}

export interface LoginResponse{
  username: string;
  status: string;
  transactionId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/transacciones/api/v1/auth/login';

  constructor() { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, loginRequest);
  }
}

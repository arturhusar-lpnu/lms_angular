import { Injectable } from '@angular/core';
import { AuthService } from './authService';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    isActive: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://localhost:7194/api/auth';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.checkInitialAuthStatus();
  }
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private checkInitialAuthStatus() {
    const token = this.authService.getToken();
    this.isLoggedInSubject.next(!!token);
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          this.authService.login(response);

          this.isLoggedInSubject.next(true);
        })
      );
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedInSubject.next(false);
  }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}

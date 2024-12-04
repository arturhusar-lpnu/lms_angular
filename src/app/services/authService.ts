import { Injectable } from '@angular/core';
import { UserData } from '../../shared/models/userData';
import { LoginResponse } from './loginService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private tokenStorageKey = 'auth_token';
  private userStorageKey = 'user_data';

  login(loginData: LoginResponse) {
    const { token, user } = loginData;

    this.setToken(token);

    const userData = new UserData(user.id, user.username, user.role);

    this.setUserData(userData);
  }

  logout() {
    this.clearToken();
    this.clearUserData();
  }

  isLoggedIn() {
    return !!this.getToken() && !!this.getUserData();
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem(this.tokenStorageKey, token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem(this.tokenStorageKey);
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem(this.tokenStorageKey);
  }

  setUserData(userData: UserData) {
    localStorage.setItem(this.userStorageKey, JSON.stringify(userData));
  }

  getUserData(): UserData | null {
    const data = localStorage.getItem(this.userStorageKey);
    return data ? JSON.parse(data) : null;
  }

  getUserRole(): string | null {
    const userData = this.getUserData();
    return userData ? userData.role : null;
  }

  clearUserData() {
    localStorage.removeItem(this.userStorageKey);
  }
}

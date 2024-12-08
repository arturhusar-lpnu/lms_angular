import { Injectable } from '@angular/core';
import { UserData } from '../../shared/models/userData';
import { LoginResponse } from './loginService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private userData: UserData | null = null;

  login(loginData: LoginResponse) {
    const { token, user } = loginData;

    this.setToken(token);

    const userData = new UserData(
      user.id,
      user.username,
      user.role,
      user.isActive
    );

    this.setUserData(userData);
  }

  logout() {
    this.clearToken();
    this.clearUserData();
  }

  isLoggedIn() {
    return !!this.token;
  }

  setToken(token: string): void {
    this.token = token;
    //localStorage.setItem(this.tokenStorageKey, token);
  }

  getToken(): string | null {
    return this.token;
    //return this.token || localStorage.getItem(this.tokenStorageKey);
  }

  clearToken(): void {
    this.token = null;
    //localStorage.removeItem(this.tokenStorageKey);
  }

  getUserId(): string | null {
    const id = this.userData?.id;
    return id ? id : null;
  }

  setUserData(userData: UserData) {
    this.userData = userData;
    //localStorage.setItem(this.userStorageKey, JSON.stringify(userData));
  }

  getUserData(): UserData | null {
    //const data = localStorage.getItem(this.userStorageKey);
    return this.userData ? this.userData : null;
    //return data ? JSON.parse(data) : null;
  }

  getUserName(): string | null {
    const data = this.getUserData();
    return data ? data.userName : null;
  }

  getUserRole(): string | null {
    const userData = this.getUserData();
    return userData ? userData.role : null;
  }

  clearUserData() {
    this.userData = null;
    //localStorage.removeItem(this.userStorageKey);
  }
}

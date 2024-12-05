import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authService';
import { AppNavigationComponent } from '../app-navigation/app-navigation.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AppNavigationComponent, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserName(): string | null {
    const userName = this.authService.getUserName();
    if (userName) {
      return userName;
    }
    this.navigateTo('/login');
    return null;
  }

  getUserRole(): string {
    return this.authService.getUserRole() || 'Guest';
  }

  login() {
    this.navigateTo('/login');
  }

  logout() {
    this.authService.logout();
    this.navigateTo('/');
  }
  private navigateTo(route: string) {
    this.router.navigate([route]);
  }
}

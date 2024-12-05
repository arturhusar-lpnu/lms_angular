import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './app-navigation.component.html',
  styleUrl: './app-navigation.component.css',
})
export class AppNavigationComponent {
  constructor(private authService: AuthService) {}
  getUserRole() {
    return this.authService.getUserRole();
  }
}

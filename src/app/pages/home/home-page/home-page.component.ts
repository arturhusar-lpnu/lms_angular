import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authService';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-home-page',
  imports: [CommonModule, NgIf],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  isLoggedIn = false;
  userName: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const userName = this.authService.getUserName();
      if (userName) {
        this.userName = userName;
      } else {
        this.userName = undefined;
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}

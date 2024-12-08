import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-permission-denied-page',
  imports: [],
  templateUrl: './permission-denied-page.component.html',
  styleUrl: './permission-denied-page.component.css',
})
export class PermissionDeniedPageComponent {
  constructor(private router: Router) {}
  navigateHome() {
    this.router.navigate(['/']);
  }
}

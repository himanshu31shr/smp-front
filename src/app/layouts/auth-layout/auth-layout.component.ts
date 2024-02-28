import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {

  title = 'frontend';

  isExpanded = true;

  toggleSidenav(): void {
    this.isExpanded = !this.isExpanded;
  }

  sidenavOpened(opened: boolean): void {
    this.isExpanded = opened;
  }

  closeSidenav(): void {
    this.isExpanded = false;
  }
}

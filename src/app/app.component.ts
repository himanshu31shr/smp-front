import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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

import { Component, signal } from '@angular/core';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faPlusCircle,
  faGear,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, MatSlideToggleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user = signal(localStorage.getItem('name'));
  constructor(library: FaIconLibrary) {
    library.addIcons(faPlusCircle, faBell, faGear, faSignOut);
  }

  isProfileVisible = false;

  toggleProfile() {
    this.isProfileVisible = !this.isProfileVisible;
  }

  plusIcon = faPlusCircle;
  notificationIcon = faBell;
  settingsIcon = faGear;
  logoutIcon = faSignOut;
}

import { Component, signal } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faUser,
  faChevronDown,
  faArrowsRotate,
  faCalendarWeek,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-welcome-banner',
  imports: [FontAwesomeModule],
  templateUrl: './welcome-banner.component.html',
  styleUrl: './welcome-banner.component.css',
})
export class WelcomeBannerComponent {
  user = signal(localStorage.getItem('name')?.split(' ')[0]);
  isVisible = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHome,
      faUser,
      faCalendarWeek,
      faChevronDown,
      faArrowsRotate
    );
  }
  calendarIcon = faCalendarWeek;
  chevronDown = faChevronDown;
  refreshIcon = faArrowsRotate;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  setVisibility(arg: boolean) {
    this.isVisible = arg;
  }
}

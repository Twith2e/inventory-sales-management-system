import { Component } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-card',
  imports: [FontAwesomeModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css',
})
export class DashboardCardComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faChevronDown);
  }

  downIcon = faChevronDown;
}

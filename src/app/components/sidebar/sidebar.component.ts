import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faCreditCardAlt,
  faCube,
  faLayerGroup,
  faServer,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCreditCardAlt,
      faLayerGroup,
      faCube,
      faServer,
      faUserTie
    );
  }
  dashboardIcon = faLayerGroup;
  transactionsIcon = faCreditCardAlt;
  inventoryIcon = faCube;
  databaseIcon = faServer;
  adminIcon = faUserTie;
}

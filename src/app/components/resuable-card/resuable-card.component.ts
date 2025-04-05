import { Component, Input } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resuable-card',
  imports: [FontAwesomeModule],
  templateUrl: './resuable-card.component.html',
  styleUrl: './resuable-card.component.css',
})
export class ResuableCardComponent {
  @Input() icon: SVGElement | null = null;
  @Input() url = '';
  @Input() amount = '';
  @Input() text = '';
  @Input() bgColor = '';

  constructor(library: FaIconLibrary) {
    library.addIcons(faRotateLeft);
  }

  refreshIcon = faRotateLeft;
}

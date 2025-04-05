import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-reusable-table',
  imports: [],
  templateUrl: './reusable-table.component.html',
  styleUrl: './reusable-table.component.css',
})
export class ReusableTableComponent {
  @Input() HeaderArray: Array<any> = [];
  @Input() RowArray: any[] = [];
  @Input() isAction = signal(false);
}

import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isAlertCreated: boolean = false;

  onCreatedTask(event: void) {
    this.isAlertCreated=!this.isAlertCreated;
  }

}

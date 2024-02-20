import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TableComponent } from '../table/table.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, TableComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isAlertCreated: boolean = false;

  onCreatedTask(event: void) {
    this.isAlertCreated=!this.isAlertCreated;
  }

}

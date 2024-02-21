import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TableComponent } from '../table/table.component';
import { FooterComponent } from '../footer/footer.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, TableComponent, FooterComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isAlertCreated: boolean = false;

  onCreatedTask(event: void) {
    this.isAlertCreated=!this.isAlertCreated;
  }

}

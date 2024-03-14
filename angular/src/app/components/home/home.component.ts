import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TableComponent } from '../table/table.component';
import { FooterComponent } from '../footer/footer.component';
import { LoadingComponent } from '../loading/loading.component';
import {Location } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, TableComponent, FooterComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isAlertCreated: boolean = false;
  isAlertCreatedNull: boolean = false;

  //add url da página
  constructor(private location: Location){}

  ngOnInit(): void {
    this.location.go('/home');
  }

  //Repassar alerta do navbar
  onCreatedTask(event: void) {
    this.isAlertCreated = !this.isAlertCreated;
  }
  
  onCreatedTaskNull(event: void) {
    this.isAlertCreatedNull = !this.isAlertCreatedNull;
  }

}

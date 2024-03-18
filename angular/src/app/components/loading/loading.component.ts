import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  isLoading: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = !this.isLoading;
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  isLoading: boolean = true;
  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2200);
  }

}

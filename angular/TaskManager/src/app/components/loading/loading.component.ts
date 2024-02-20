import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../services/tasks/task.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  isLoading: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}

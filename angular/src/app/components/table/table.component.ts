import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/tasks/task.service';
import { UserService } from '../../services/users/user.service';
import { tap } from 'rxjs/internal/operators/tap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  //Alertas
  @Input()
  isAlertCreated: boolean = false;
  @Input()
  isAlertCreatedNull: boolean = false;
  isAlertUpdate: boolean = false;
  isAlertDelete: boolean = false;

  isShowOrHideAlertCreatedNull() {
    this.isAlertCreatedNull = !this.isAlertCreatedNull;
  }
  isShowOrHideAlertCreated() {
    this.isAlertCreated = !this.isAlertCreated;
  }
  isShowOrHideAlertUpdate() {
    this.isAlertUpdate = !this.isAlertUpdate;
  }
  isShowOrHideAlertDelete() {
    this.isAlertDelete = !this.isAlertDelete;
  }

  //Vai receber os input para atualizar os dados
  task: any =
    {
      id: '',
      title: '',
      priority: '',
      status: '',
      createdAt: '',
      updatedAt: '',
      assignedUser: ''

    };

  //Vai receber a lista de atividades do banco
  tasks = [
    {
      id: '',
      userId: {
        id: '',
        fullName: ''
      },
      title: '',
      priority: '',
      status: '',
      createdAt: '',
      updatedAt: '',

    }
  ]

  //Lista de usuários no banco
  users = [
    {
      id: '',
      fullName: '',
      email: '',
      password: '',
      imageProfile: ''
    }
  ]

  constructor(private taskService: TaskService, private userService: UserService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe();
    this.taskService.taskSubject.subscribe(
      (auth) => {
        this.tasks = auth.tasks;
        this.renderedTasks = auth.tasks;
      }
    );
    this.userService.getAllUsers().subscribe();
    this.userService.authSubject.subscribe(
      (users) => {
        this.users = users.users;
      }
    );
  }

  //Mostrar e esconder modal de atualizar
  priority = ['High priority', 'Medium priority', 'Low priority'];
  status = ['To Do', 'Doing', 'Done', 'Updating'];

  modalUpdated: boolean = true;
  modalDelete: boolean = true;

  onShowUpdate(id: any) {
    let selectedTask = null;

    for (const task of this.tasks) {
      if (task.id === id) {
        selectedTask = task;
        break;
      }
    }

    if (selectedTask) {
      this.task = {
        id: selectedTask.id,
        assignedUser: selectedTask.userId.fullName,
        title: selectedTask.title,
        priority: selectedTask.priority,
        status: selectedTask.status,
        createdAt: selectedTask.createdAt,
        updatedAt: selectedTask.updatedAt
      };
    }
    this.modalUpdated = !this.modalUpdated;
  }

  onHideUpdate() {
    this.modalUpdated = !this.modalUpdated;
  }

  //Deleta a atividade selecionada
  taskId: any;
  taskTitle: any;

  onShowDelete(taskId: any, taskTitle: any) {
    this.taskId = taskId;
    this.taskTitle = taskTitle;
    this.modalDelete = !this.modalDelete;
  }

  onHideDelete() {
    this.modalDelete = !this.modalDelete;
  }

  onDelete() {
    this.taskService.deleteTasks(this.taskId).pipe(
      tap(() => {
        this.isAlertDelete = !this.isAlertDelete;
      })
    ).subscribe();
  }

  //Atualiza a atividade selecionada
  onUpdate() {
    let userId = null;

    for (const user of this.users) {
      if (user.fullName === this.task.assignedUser) {
        userId = user.id;
        break;
      }
    }

    this.taskService.updateTasks(this.task, userId).pipe(
      tap(() => {
        this.isAlertUpdate = !this.isAlertUpdate;
      })
    ).subscribe();
  }

  //Filtro na barra de pesquisa
  renderedTasks = [
    {
      id: '',
      userId: {
        id: '',
        fullName: ''
      },
      title: '',
      priority: '',
      status: '',
      createdAt: '',
      updatedAt: '',
    }
  ]

  searchText: string = '';

  trackByFn(index: number, item: any) {
    return item.id;
  }

  filterTasks() {
    if (!this.searchText) {
      this.renderedTasks = this.tasks;
    } else {
      this.renderedTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}

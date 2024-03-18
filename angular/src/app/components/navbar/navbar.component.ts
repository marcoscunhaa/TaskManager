import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TaskService } from '../../services/tasks/task.service';
import { UserService } from '../../services/users/user.service';
import { tap } from 'rxjs/internal/operators/tap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  //Atributo que recebe o usuário logado
  user: any = null;

  //Vai receber a lista de usuários do banco
  users = [
    {
      id: '',
      fullName: '',
      email: '',
      password: '',
    }
  ];

  constructor(private authService: AuthService, private taskService: TaskService, private userService: UserService) { }

  ngOnInit() {
    this.authService.getUserProfile().subscribe();
    this.authService.authSubject.subscribe(
      (auth) => {
        this.user = auth.user;
      }
    );
    this.userService.getAllUsers().subscribe();
    this.userService.authSubject.subscribe(
      (users) => {
        this.users = users.users;
      }
    )
  }

  @Output() createdTask: EventEmitter<void> = new EventEmitter<void>();
  @Output() createdTaskNull: EventEmitter<void> = new EventEmitter<void>();

  //Vai receber os inputs para a nova tarefa
  task: any = {
    assignedUser: '',
    title: '',
    priority: '',
    status: ''
  };

  //Atributos para o select de criar tarefa
  priority = ['High priority', 'Medium priority', 'Low priority'];
  status = ['To Do', 'Doing', 'Done', 'Updating'];


  //Limpa os dados de usuário logado
  onLogout() {
    this.authService.logout();
  }

  //Cria uma nova tarefa
  onSubmit() {
    let userId = null;

    if (this.task.assignedUser === '' || this.task.title === '' || this.task.priority === '' || this.task.status === '') {
      this.createdTaskNull.emit();
    }

    for (const user of this.users) {
      if (user.fullName === this.task.assignedUser) {
        userId = user.id;
        break;
      }
    }

    this.taskService.createTasks(this.task, userId).pipe(
      tap(() => {
        this.createdTask.emit();
      })
    ).subscribe();
  }

  //Atributo que mostrar e esconde modal de cadastrar tarefa
  modal: boolean = true;

  //Mostra e esconden modal de cadastro de tarefas
  onHideOrShow() {
    this.modal = !this.modal;

    this.task = {
      assignedUser: '',
      title: '',
      priority: '',
      status: ''
    };
  }
}

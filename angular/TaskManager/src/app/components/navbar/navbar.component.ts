import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { TaskService } from '../../services/tasks/task.service';
import { UserService } from '../../services/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  //Atributo que recebe o usuário logado
  user:any=null;

  //Vai receber a lista de usuários do banco
  users = [
    {
      fullName:'',
      email:'',
      password:'',
    }
  ];

  //Vai receber os inputs para a nova tarefa
  task : any = {
    assignedUser:'',
    title: '',
    priority: '',
    status: ''
  };

  //Atributos para o select de criar tarefa
  priority = ['High priority', 'Medium priority', 'Low priority'];
  status = ['To Do', 'Doing', 'Done', 'Updating'];

  //Atributo que mostrar e esconde modal de cadastrar tarefa
  modal: boolean = true;

  constructor(private authService:AuthService, private taskService:TaskService, private userService:UserService, private router:Router){}

  ngOnInit(){
    this.authService.getUserProfile().subscribe();
    this.authService.authSubject.subscribe(
      (auth)=>{
          this.user = auth.user;
      }
    );
    this.userService.getAllUsers().subscribe();
    this.userService.authSubject.subscribe(
      (users)=>{
        this.users=users.users;
      }
    )
  }

  @Output() createdTask: EventEmitter<void> = new EventEmitter<void>();

  //Limpa os dados de usuário logado
  onLogout(){
    this.authService.logout();
  }
  
  //Cria uma nova tarefa
  onSubmit(){
    this.taskService.createTasks(this.task, this.task.assignedUser).subscribe();
    this.createdTask.emit();
  }

  //Mostra e esconden modal de cadastro de tarefas
  onHideOrShow(){
    this.modal = !this.modal;
  }

}

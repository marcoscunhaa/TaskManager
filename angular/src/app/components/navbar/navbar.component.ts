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

  constructor(private authService: AuthService, private userService: UserService) { }

  currentDateTime: any = null;

   updateDateTime() {
     this.currentDateTime = new Date();
   }

  ngOnInit() {
    setInterval(() => {
      this.updateDateTime();
    }, 1000);
    
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

  //Limpa os dados de usuário logado
  onLogout() {
    this.authService.logout();
  }

}

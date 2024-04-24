declare var google: any;

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule, Location } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { LoadingComponent } from '../loading/loading.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RegisterComponent, LoadingComponent, HomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private formBuilder: FormBuilder, private location: Location) { }

  ngOnInit(): void {
    this.location.go('/login');
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (google?.account?.id) {
      google.account.id.initialize({
        client_id: '845072611993-ue41umups0ivjthciumim12qb38p6sha.apps.googleusercontent.com',
        callback: (resp: any) => {

        }
      });

      google.account.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350
      });
    }
  }

  //Alerta de erro no login
  isAlertLogin: boolean = false;

  isShowOrHideAlert() {
    this.isAlertLogin = false;
  }

  //formulário de login
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  //Validação de login
  user: any = null

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem("jwt", response.jwt);
          this.authService.getUserProfile().subscribe();
        },
        error: (error) => {
          this.isAlertLogin = true;
        }
      }),
        this.authService.authSubject.subscribe(
          (auth) => {
            this.user = auth.user;
          }
        );
    };
  }
}

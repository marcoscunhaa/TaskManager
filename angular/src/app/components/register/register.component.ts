import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { LoadingComponent } from '../loading/loading.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, LoginComponent, LoadingComponent, HomeComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //Alerta de erro no register
  isAlertErrorEmail: boolean = false;

  isShowOrHideAlertErrorEmail() {
    this.isAlertErrorEmail = false;
  }

  //formulário de registrar-se
  constructor(public authService: AuthService, private formBuilder: FormBuilder, private location: Location) { }

  ngOnInit(): void {
    this.location.go('/register');
    this.registerForm = this.formBuilder.group({
      imageProfile: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  registerForm: FormGroup = new FormGroup({
    imageProfile: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required)
  });

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('passwordConfirmation')?.value;
  
    if (password === confirmPassword) {
      return null; // Senhas coincidem, nenhum erro
    } else {
      return { passwordMismatch: true }; // Senhas não coincidem, retornar erro
    }
  }

  //imagem de perfio - prévia
  profilePicUrl: string | undefined;
  profilePicFile: File | null = null;;

  uploadProfilePic() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0] as File;

        // Preenche profilePicUrl com o URL da imagem selecionada
        const readerUrl = new FileReader();
        readerUrl.onload = () => {
          this.profilePicUrl = readerUrl.result as string;
        };
        readerUrl.readAsDataURL(file);

        // Converte profilePicFile para ArrayBuffer e, em seguida, para um array de bytes
        const readerFile = new FileReader();
        readerFile.onload = () => {
          const arrayBuffer = readerFile.result as ArrayBuffer;
          const bytesArray = new Uint8Array(arrayBuffer);
          this.registerForm.patchValue({
            imageProfile: Array.from(bytesArray)
          });
        };
        readerFile.readAsArrayBuffer(file);
      }
    };
    input.click();
  }

  showIconOrImage = true;

  hideImage() {
    this.profilePicUrl = '';
  }

  hideIcon() {
    this.showIconOrImage = false;
  }

  //Função de adicionar o novo register
  user: any = null

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          localStorage.setItem("jwt", response.jwt);
          this.authService.getUserProfile().subscribe();
          this.authService.authSubject.subscribe(
            (auth) => {
              this.user = auth.user;
              this.showIconOrImage = false;
            }
          );
        },
        error: (error) => {
          if (error.status === 409) {
            this.isAlertErrorEmail = true;
            this.showIconOrImage = true;
          }
        }
      })
    }
  }
}

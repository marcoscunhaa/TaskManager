import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    imageProfile: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(public authServie:AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      imageProfile: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

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

  onSubmit() {
    if (this.registerForm.valid) {
      this.authServie.register(this.registerForm.value).subscribe({
        next:(response)=>{
          localStorage.setItem("jwt", response.jwt);
          this.authServie.getUserProfile().subscribe();
          this.router.navigate(['/home']); 
        }
      })
    }
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor(){
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  onSubmit(){
    if( this.loginForm.valid){
       // const { username, password } = this.loginForm.value;

        const loginRequest: LoginRequest = {
          username: this.loginForm.value.username,
          pass: this.loginForm.value.password
        };

      //  if( username === 'admin' && password === '12345'){
        this.authService.login(loginRequest).subscribe({
          next:(response) => {
            if(response.status === 'OK'){
               this.errorMessage = '';
                localStorage.setItem('isLoggedIn', 'true');

                this.router.navigate(['/dashboard']);
              } else {
                this.errorMessage = 'Usuario o contraseña incorrectos';
              }
          },
          error:(err) =>{
            console.error('Error en la petición HTTP:', err);
            if(err.status===400){
               this.errorMessage = 'Datos inválidos';
            }else{
               this.errorMessage = 'Credenciales inválidas: Usuario o contraseña incorrectos';
            }
           
          }
        });

         
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  operacionForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder){
    this.operacionForm =  this.fb.group({
      operacion:['',[Validators.required, Validators.maxLength(20)]],
      importe:['',[Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      cliente:['',[Validators.required, Validators.maxLength(50)]],
      secreto:['',[Validators.required, Validators.maxLength(50)]]
    });
  }

  onSubmit(){
    if(this.operacionForm.valid){
      console.log('Datos del formulario:', this.operacionForm.value);
      alert('¡Operación registrada con éxito!');
      this.operacionForm.reset();
    }else{
      this.operacionForm.markAllAsTouched();
    }
  }

  logout(){
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}

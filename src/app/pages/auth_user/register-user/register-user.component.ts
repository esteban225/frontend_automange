import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserRegisretService } from "../../../service/auth_service/auth-user-regisret.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {


  ngOnInit(): void {
  }


  registerForm: FormGroup;
  passwordStrength: string = 'weak';
  errorMessage: string = '';

  constructor(private readonly fb: FormBuilder, private readonly authUserRegisretService: AuthUserRegisretService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      password: [
        '', 
        [
          Validators.required, 
          Validators.minLength(8), 
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ],
      confirmPassword: ['', Validators.required],
      agree: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  checkPasswordStrength() {
    const password = this.registerForm.get('password')?.value;
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    this.passwordStrength = strongRegex.test(password) ? 'strong' : 'weak';
  }

  submitForm() {
    if (this.registerForm.valid) {
      const userData = {
        nombre: this.registerForm.value.name,
        username: this.registerForm.value.userName,
        email: this.registerForm.value.email,
        telefono: this.registerForm.value.phone,
        direccion: this.registerForm.value.address,
        password: this.registerForm.value.password
      };
  
      this.authUserRegisretService.register(userData).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Tu cuenta ha sido creada con éxito.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
  
        },
        error: (error) => {
          console.error('Registration error:', error);
          
          Swal.fire({
            title: 'Error en el registro',
            text: 'No se pudo completar el registro. El usuario ya existe en la base de datos.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
  
          this.errorMessage = 'Error registering user. Please try again later.';
        }
      });
  
    } else {
      console.log('Form Invalid');
  
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
}

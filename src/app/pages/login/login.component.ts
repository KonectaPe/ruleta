import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    username: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
      // Validators.pattern(/^[1-9]{8}$/),
    ]),
    password: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      // Validators.pattern(/^[a-zA-Z0-9]{8,20}$/),
    ]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
  ) {}

  login(): void {
    if (this.form.invalid) {
      alert('Por favor, revise los campos del formulario.');
      return;
    }

    const user = {
      username: this.form.value!.username,
      password: this.form.value!.password,
    };

    this.userService.login(user).subscribe({
      next: (response: { token: string }) => {
        if (response.token) {
          this.authService.setToken(response.token);
          this.router.navigate(['/dashboard']);
          return;
        }
      },
      error: (error) => {
        alert('Ocurrió un error al intentar iniciar sesión.');
      },
    });
  }
}
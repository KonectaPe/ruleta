import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-participant',
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.css',
})
export class ParticipantComponent {
  @ViewChild('focusUsername') focusUsername!: ElementRef;
  formBuilder: FormBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    username: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
      // Validators.pattern(/^[1-9]{8}$/),
    ]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
  ) {}

  register(): void {
    if (this.form.invalid) {
      alert('Por favor, revise los campos del formulario.');
      return;
    }

    const user = {
      username: this.form.value!.username,
    };

    this.userService.register(user).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response) {
          alert('Se ha creado el usuario: ' + response.username);
          this.form.reset();
          this.focusUsername.nativeElement.focus();
        }
      },
      error: (error) => {
        alert('Ocurrió un error al intentar registrar usuario.');
      },
    });
  }
}
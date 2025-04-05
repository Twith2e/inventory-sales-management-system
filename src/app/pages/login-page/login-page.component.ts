import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  hidePassword: boolean = true;
  loginService = inject(LoginService);
  isLoading = signal(false);
  router = inject(Router);

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);

      this.loginService
        .handleLogin(this.loginForm.value)
        .pipe(
          catchError((err) => {
            console.error(err);
            this.isLoading.set(false);
            throw err;
          })
        )
        .subscribe({
          next: (response) => {
            console.log(response);

            this.isLoading.set(false);
            this.loginForm.reset({ email: '', password: '' });
            localStorage.setItem('name', response.name);
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error(error);
            this.isLoading.set(false);
            this.loginForm.reset({ email: '', password: '' });
          },
        });
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/Services/user.service';
import { IUser } from 'src/Services/user.model';

@Component({
  selector: 'bot-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  registerError: string | null = null;
  isSubmitting = false;
  hidePassword = true;

  constructor(private userService: UserService, private router: Router) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  register() {
    this.registerError = null;
    this.isSubmitting = true;
    this.userService.register(this.user).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 409) {
          this.registerError = 'A user with this email already exists.';
        } else if (err.error && err.error.error) {
          this.registerError = err.error.error;
        } else {
          this.registerError = 'Registration failed. Please try again.';
        }
      },
    });
  }
}

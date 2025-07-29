import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserCredentials } from 'src/Services/user.model';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'bot-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  credentials: IUserCredentials = {
    email: '',
    password: '',
  };
  hidePassword: boolean = true;
  isSubmitting = false;

  constructor(private userService: UserService, private router: Router) {}
  signInError: boolean = false;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  signIn() {
    this.signInError = false;
    this.isSubmitting = true;
    this.userService.signIn(this.credentials).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/catalog']);
      },
      error: () => {
        this.isSubmitting = false;
        this.signInError = true;
      },
    });
  }
}

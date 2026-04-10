import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { SIGNUP_USER } from '../../graphql.operations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.html',
})
export class Signup {
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private apollo: Apollo, private router: Router) {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.apollo.mutate({
        mutation: SIGNUP_USER,
        variables: this.signupForm.value
      }).subscribe({
        next: (result) => {
          console.log('User created:', result);
          this.router.navigate(['/login']); 
        },
        error: (err) => alert(err.message)
      });
    }
  }
}
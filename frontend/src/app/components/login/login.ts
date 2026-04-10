import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { LOGIN_USER } from '../../graphql.operations';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private apollo: Apollo, private router: Router) {}

onSubmit() {
  if (this.loginForm.valid) {
    this.apollo.query({ 
      query: LOGIN_USER,
      variables: this.loginForm.value
    }).subscribe({
      next: (result: any) => {
        console.log('Login Result:', result.data);
        
        if (result.data?.login === "Login Successful") {
          localStorage.setItem('user', this.loginForm.value.username || '');
          this.router.navigate(['/employees']);
        } else {
          alert('Login failed. Please check your credentials.');
        }
      },
      error: (err) => {
        console.error('Login Error:', err);
        alert('Error: ' + err.message);
      }
    });
  }
}
}
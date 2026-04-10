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
      this.apollo.mutate({
        mutation: LOGIN_USER,
        variables: this.loginForm.value
      }).subscribe({
        next: (result: any) => {
          const token = result.data.login.token;
          localStorage.setItem('token', token);
          
          console.log('Login successful, token saved');
          this.router.navigate(['/employees']); 
        },
        error: (err) => alert('Invalid Credentials: ' + err.message)
      });
    }
  }
}
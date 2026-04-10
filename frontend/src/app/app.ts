import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontend';

  constructor(private router: Router) {} 

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    this.router.navigate(['/login']);
    
    console.log('User logged out successfully');
  }
}
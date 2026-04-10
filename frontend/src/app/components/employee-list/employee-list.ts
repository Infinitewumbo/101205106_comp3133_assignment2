import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-employee-list',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList { }
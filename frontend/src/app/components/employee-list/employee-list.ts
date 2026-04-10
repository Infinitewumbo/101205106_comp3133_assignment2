import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Add ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef // Inject this to force a screen refresh
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (result: any) => {
        console.log('Data arrived in TS:', result.data.getAllEmployees);
        this.employees = [...result.data.getAllEmployees]; // Create a brand new array reference
        this.cdr.detectChanges(); // Manually tell Angular: "The data changed, redraw now!"
      },
      error: (err) => console.error(err)
    });
  }
}
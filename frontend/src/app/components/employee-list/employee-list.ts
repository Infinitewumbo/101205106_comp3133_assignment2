import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef 
  ) {}

ngOnInit(): void {
  this.employeeService.getEmployees().subscribe({
    next: (result: any) => {
      const employees = result?.data?.getAllEmployees;
      
      if (employees) {
        console.log('Data arrived in TS:', employees);
        this.employees = [...employees];
      } else {
        console.warn('No data returned from server. Check for GraphQL errors.');
        this.employees = [];
      }
      
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Connection Error:', err);
      this.employees = []; 
    }
  });
}

deleteEmployee(id: string) {
  if (confirm('Are you sure you want to delete this employee?')) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (result: any) => {
        console.log('Deleted successfully:', result);
        
        this.employees = this.employees.filter(emp => emp.id !== id);
        
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Delete failed:', err);
        alert('Error deleting: ' + err.message);
      }
    });
  }
}

loadEmployees() {
  this.employeeService.getEmployees().subscribe({
  next: (result: any) => {
    if (result && result.data && result.data.getAllEmployees) {
      this.employees = result.data.getAllEmployees;
    } else {
      console.warn("Query ran but returned no employee data.");
      this.employees = []; 
    }
  },
  error: (err) => {
    console.error("GraphQL Error:", err);
    this.employees = [];
  }
});
}
}
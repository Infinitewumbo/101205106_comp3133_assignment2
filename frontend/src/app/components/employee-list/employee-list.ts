import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';
import { DELETE_EMPLOYEE } from '../../graphql.operations';

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
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (result: any) => {
        console.log('Data arrived in TS:', result.data.getAllEmployees);
        this.employees = [...result.data.getAllEmployees]; 
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error(err)
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
}
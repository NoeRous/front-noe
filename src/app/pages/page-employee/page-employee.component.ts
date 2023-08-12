import { Component } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { DialogEmployeeInstitutionsComponent } from './dialog-employee-institutions/dialog-employee-institutions.component';

@Component({
  selector: 'app-page-employee',
  templateUrl: './page-employee.component.html',
  styleUrls: ['./page-employee.component.scss']
})
export class PageEmployeeComponent {

  employees: Employee[] = [];
  loading: boolean = true;


  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getEmployees()
    
  }


  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (postulations) => {
        this.employees = postulations;
        this.loading = false; // Se detiene la carga después de recibir los datos exitosamente
      },
      (error) => {
        console.error('Error al obtener los empleados:', error);
        this.loading = false; // Importante establecer a falso en caso de error también
      }
    );
  }
  btnDialogInstitutions(employee:Employee){
    const dialogRef = this.dialog.open(DialogEmployeeInstitutionsComponent, {data:{data:employee}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getEmployees();
    });

  }

}

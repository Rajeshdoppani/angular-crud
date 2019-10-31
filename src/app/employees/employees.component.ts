import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from "../services/employee.service";
import { CookieService } from "ngx-cookie-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  displayedColumns = ['sno', 'name', 'age', 'designation', 'actions'];
  dataSource: MatTableDataSource<postsListResp>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  employeeData: any;
  addEmployeeForm: FormGroup;
  updateEmployeeForm: FormGroup;
  id: any;

  constructor(private cookieService: CookieService, private employeeService: EmployeeService, private formBuilder: FormBuilder, private router: Router) {
    this.addEmployeeForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'age': ['', [Validators.required]],
      'designation': ['', [Validators.required]]
    })

    this.updateEmployeeForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'age': ['', [Validators.required]],
      'designation': ['', [Validators.required]]
    })

    this.getAllEmployees();
  }

  // GET All Employees //
  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(resp => {
      this.employeeData = resp;
      this.dataSource = new MatTableDataSource(this.employeeData);
      this.dataSource.paginator = this.paginator;
    })
  };
 
  openPostModal() {
    $('#addEmployeeModal').modal('show');
    Object.keys(this.addEmployeeForm.controls).forEach(key => {
      this.addEmployeeForm.get(key).setValue('');
      this.addEmployeeForm.get(key).markAsPristine();
      this.addEmployeeForm.get(key).markAsUntouched();
      this.addEmployeeForm.get(key).updateValueAndValidity();
    });
  }

  // Add an Employee //
  addEmployee() {
    $('#addEmployeeModal').modal('hide');
    let formData = this.addEmployeeForm.value;
    this.employeeService.addEmployee(formData).subscribe(resp => {
      alert('Employee added Successfully......');
      this.getAllEmployees();
    })
  };

  viewEmployeeDetails(row) {
    $('#viewEmployeeModal').modal('show');
    this.id = row._id
    this.updateEmployeeForm.setValue({
      name: row.name,
      age: row.age,
      designation: row.designation
    })
  }

  // Update an Employee //
  updatePost() {
    $('#viewEmployeeModal').modal('show');
    let updatedData = this.updateEmployeeForm.value;
    this.employeeService.updateEmployee(updatedData, this.id).subscribe(resp => {
      alert('Employee updated successfully');
      this.getAllEmployees();
    })
  };

  // Delete an Employee // 
  deleteEmp(row) {
    let id = row._id;
    if (confirm('Do you want to Delete an Employee')) {
      this.employeeService.deleteEmployee(id).subscribe(resp => {
        this.getAllEmployees();
        alert('Employee deleted successfully.......');

      })
    } else {
      this.getAllEmployees();
    }
  };

  logoutUser(){
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }


  ngOnInit() {
  }

}
export interface postsListResp {
  name, age, designation
}
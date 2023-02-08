import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Services/employee.service';
import { StoreData } from 'src/app/ViewModels/store-data';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit
{
empDetail !: FormGroup;
empObj : StoreData = new StoreData();
empList : StoreData[] = [];
page: number = 1;
count: number = 0;
tableSize: number = 10;

constructor(private formBuilder : FormBuilder, private empService : EmployeeService ,private _ToastrService: ToastrService) { }

ngOnInit(): void {
  this.getAllEmployees();
  this.Pagination();
  this.empDetail = this.formBuilder.group({
    id : [''],
    name : ['',Validators.required],
    email: ['',[Validators.required , Validators.email]],
    address: ['',Validators.required ],
    phone: ['',[Validators.required, Validators.pattern("[0-9 ]{11}"), Validators.maxLength(11),Validators.minLength(11)]],
  });

}

addEmployee() {
  console.log(this.empDetail);
  this.empObj.empId = this.empDetail.value.id;
  this.empObj.empName = this.empDetail.value.name;
  this.empObj.empEmail = this.empDetail.value.email;
  this.empObj.empAddress = this.empDetail.value.address;
  this.empObj.empPhone = this.empDetail.value.phone;

  this.empService.addEmployee(this.empObj).subscribe(res=>{
      console.log(res);
      this.getAllEmployees();
  },err=>{
      console.log(err);
  });

}

get m(){
  return this.empDetail.controls;
}

onSubmit(){
  console.log(this.empDetail.value);
}

getAllEmployees()
{
  this.empService.getAllEmployee().subscribe(res=>{
      this.empList = res;
  },err=>{
    console.log("error while fetching data.")
  });
}

editEmployee(emp : StoreData) {
  this.empDetail.controls['id'].setValue(emp.empId);
  this.empDetail.controls['name'].setValue(emp.empName);
  this.empDetail.controls['email'].setValue(emp.empEmail);
  this.empDetail.controls['address'].setValue(emp.empAddress);
  this.empDetail.controls['phone'].setValue(emp.empPhone);

}

updateEmployee() {

  this.empObj.empId = this.empDetail.value.id;
  this.empObj.empName = this.empDetail.value.name;
  this.empObj.empEmail = this.empDetail.value.email;
  this.empObj.empAddress = this.empDetail.value.address;
  this.empObj.empPhone = this.empDetail.value.phone;


  this.empService.updateEmployee(this.empObj).subscribe(res=>{
    console.log(res);
    this._ToastrService.success('Employee Edited Successfully');
    this.getAllEmployees();
  },err=>{
    console.log(err);
  })

}

deleteEmployee(emp : StoreData) {

  this.empService.deleteEmployee(emp).subscribe(res=>{
    console.log(res);
    this._ToastrService.success('Employee deleted Successfully');
    this.getAllEmployees();
  },err => {
    console.log(err);
  });

}


Pagination(): void {
  this.empService.getAllEmployee().subscribe((response) => {
      this.empList = response;
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}
onTableDataChange(event: any) {
  this.page = event;
  this.Pagination();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.Pagination();
}

}


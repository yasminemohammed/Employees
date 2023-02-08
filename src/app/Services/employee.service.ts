import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { StoreData } from '../ViewModels/store-data';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  addEmpURL : string;
  getEmpURL : string;
  updateEmpUrl : string;
  deleteEmpUrl : string;

  constructor(private http : HttpClient) {

    this.addEmpURL = 'http://task.soft-zone.net/api/Employees/addEmployee';
    this.getEmpURL = `http://task.soft-zone.net/api/Employees/getAllEmployees`;
    this.updateEmpUrl = 'http://task.soft-zone.net/api/Employees/editEmployee';
    this.deleteEmpUrl = 'http://task.soft-zone.net/api/Employees/deleteEmpByID';

  }

  addEmployee(emp : StoreData): Observable<StoreData> {
    return this.http.post<StoreData>(this.addEmpURL,emp);
  }

  getAllEmployee(): Observable<StoreData[]>{
    return this.http.get<StoreData[]>(this.getEmpURL);
  }

  updateEmployee(emp :StoreData) : Observable<StoreData>{
    return this.http.put<StoreData>(this.updateEmpUrl, emp);
  }

  deleteEmployee(emp : StoreData) : Observable<StoreData> {
    return this.http.delete<StoreData>(this.deleteEmpUrl+'/'+emp.empId);
  }


}

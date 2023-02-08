import { Component } from '@angular/core';
import { EmployeeService } from './Services/employee.service';
@Component({
  selector: 'app-root', //component directive
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myproject';

  constructor(private EmployeeService : EmployeeService)
  {
  }


}

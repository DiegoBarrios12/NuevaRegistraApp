import { Component, inject, OnInit } from '@angular/core';
import { Employees } from 'src/app/models/employees';
import { UtilsService } from 'src/app/services/utils.service';
import { UpdateEmployeeComponent } from 'src/app/shared/components/update-employee/update-employee.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  utilService= inject(UtilsService);
  

  ngOnInit() {
  }
async addUpdateEmployee( employee?:Employees){
  let modal= await this.utilService.getModal({
    component: UpdateEmployeeComponent,
    cssClass:'add-update-modal',
    componentProps: { employee }
  })
}
}

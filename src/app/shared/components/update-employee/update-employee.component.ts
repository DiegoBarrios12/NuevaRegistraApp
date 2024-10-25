import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent  implements OnInit {

    firebaseService = inject(FirebaseService);
    utilsService = inject(UtilsService);
  
    constructor() { }
  
    form= new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      //img: new FormControl('', [Validators.required]),
      salario: new FormControl('', [Validators.required, Validators.min(0)]),
      cargo: new FormControl('', [Validators.required]),
      plantel: new FormControl('', [Validators.required]),
    })
    ngOnInit() {
    }
  
    async submit(){
      console.log(this.form.value);
      
            
    }
  }

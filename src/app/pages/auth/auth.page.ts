import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  firebaseService = inject(FirebaseService);
  router= inject(Router);

  constructor() { }

  form= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
      this.firebaseService.sigIn(this.form.value as User)
      .then(resp =>{
        console.log('__hola mubndooo',resp);
        this.router.navigateByUrl('/main/home')
      })
    }
    
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spash',
  templateUrl: './spash.page.html',
  styleUrls: ['./spash.page.scss'],
})
export class SpashPage implements OnInit {

  ruter = inject(Router)
  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      this.ruter.navigateByUrl('/auth')
    },3500)
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpashPageRoutingModule } from './spash-routing.module';

import { SpashPage } from './spash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpashPageRoutingModule
  ],
  declarations: [SpashPage]
})
export class SpashPageModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { initializeApp} from 'firebase/app';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule}from '@angular/fire/compat'
import { AngularFirestoreModule}from '@angular/fire/compat/firestore'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


export const firebaseConfig = {
  apiKey: "AIzaSyAQ971liZpi1HFSK56iN-BRUvvXTSRG6DQ",
  authDomain: "nuevaregistraapp.firebaseapp.com",
  projectId: "nuevaregistraapp",
  storageBucket: "nuevaregistraapp.appspot.com",
  messagingSenderId: "881051179972",
  appId: "1:881051179972:web:c2299ac4bdbcc8a9bd2291"
};

initializeApp(firebaseConfig);

 
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

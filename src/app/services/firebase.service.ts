import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile, sendPasswordResetEmail} from 'firebase/auth'
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  getAuth(){
    return getAuth();
  }

  sigIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  constructor() { }
}

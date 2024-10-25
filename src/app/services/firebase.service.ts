import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile, sendPasswordResetEmail} from 'firebase/auth'
import { User } from '../models/user.model';
import { doc, getDoc, getFirestore, setDoc } from '@angular/fire/firestore'
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsService = inject(UtilsService)

  getAuth(){
    return getAuth();
  }

  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  signUp( user: User){
      return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  updateUser(displayName: any){
    return updateProfile(getAuth().currentUser,{displayName});
  }
  setDocument(path: any, data: any){
    return setDoc(doc(getFirestore(), path), data)
} 
   async getDocument(path: any){
    return (await (getDoc(doc(getFirestore(), path)))).data()
  }
  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(),email);
  }
  signOut(){
    localStorage.removeItem('user');
    this.utilsService.routerlink('/auth')
  }
}

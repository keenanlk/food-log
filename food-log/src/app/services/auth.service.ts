import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import { first } from "rxjs/operators";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    public toastController: ToastController,
    private router: Router,
    public userService: UserService
  ) {}

  //login
  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //lgout
  logout(): Promise<void> {
    return firebase.auth().signOut();
  }

  //register in firebase
  async register(displayName: string, email: string, password: string) {
    console.log(email);
    this.userService.createUser(displayName, email).subscribe(data => {
      console.log(data);
    });
    const user = await this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data.user.uid);

        this.presentToast();
        this.router.navigateByUrl("");
      })
      .catch(error => {
        return 0;
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Registered Succesfully!",
      duration: 2000
    });
    toast.present();
  }

  //check if user is logged in
  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}

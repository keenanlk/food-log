import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage {
  public signupForm: FormGroup;
  userId: string;
  displayName: string;
  email: string;
  name: string;
  result: number;

  constructor(
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      displayName: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  //register new user in firebase
  async register(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        "Need to complete the form, current value: ",
        signupForm.value
      );
    } else {
      const displayName = signupForm.value.displayName;
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;

      await this.authService.register(displayName, email, password);
    }
  }
}

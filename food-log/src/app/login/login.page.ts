import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../services/auth.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  //if user is logged in then nav to tab1, else keep on login page
  async ionViewWillEnter() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.authService.isLoggedIn().then(x => {
      if (x) {
        this.router.navigateByUrl("tabs");
        this.loading.dismiss();
      } else {
        this.loading.dismiss();
      }
    });
  }

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private router: Router,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  //login to firebase
  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log("Form is not valid yet, current value: ", loginForm.valid);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      const email = loginForm.value.email;
      const password = loginForm.value.password;

      this.authService.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl("tabs");
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            await alert.present;
          });
        }
      );
    }
  }

  ngOnInit() {}

  navigate() {
    this.router.navigateByUrl("tabs");
  }

  register() {
    this.router.navigateByUrl("register");
  }
}

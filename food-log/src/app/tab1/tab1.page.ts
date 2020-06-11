import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
import { User } from "../models/user";
import { Log } from "../models/log";
import { LogService } from "../services/log.service";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { NewlogComponent } from "./newlog/newlog.component";
import {
  LoadingController,
  AlertController,
  PopoverController
} from "@ionic/angular";
import { PhotoComponent } from "./photo/photo.component";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  user: User;
  logs: Log[];
  public email;
  public lat;
  public lon;
  public geolocationPosition;
  public ip;
  public userId;
  public isFinsihed: boolean = false;
  public loading: HTMLIonLoadingElement;
  displayName: string;
  public open = false;
  public logId;
  constructor(
    public modalController: ModalController,
    private userService: UserService,
    public loadingCtrl: LoadingController,
    private logService: LogService,
    private router: Router,

    private popoverController: PopoverController
  ) {}

  //show log details
  showDetail(log: Log) {
    this.logService.setCurrentLog(log);
    this.router.navigateByUrl("tabs/tab1/logdetail");
  }

  async displayImage(downloadUrl) {
    const popover = await this.popoverController.create({
      component: PhotoComponent,
      componentProps: { url: downloadUrl },
      animated: true,
      translucent: true,
      cssClass: "popover"
    });

    return await popover.present();
  }

  //get current user information
  async ionViewWillEnter() {
    this.email = (await this.userService.findUser()).email;
    this.userService.getCurrentUser(this.email).subscribe(data => {
      this.displayName = data.displayName;
      this.userId = data.userId;
      this.isFinsihed = true;
    });
  }

  //call method to get the list of logs
  async ionViewDidEnter() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.getLogsByUser();
  }

  //present modal to add new log
  async presentModal() {
    const modal = await this.modalController.create({
      component: NewlogComponent,
      componentProps: {
        userId: this.userId
      }
    });
    modal.onDidDismiss().then(() => {
      this.getLogsByUser();
    });
    return await modal.present();
  }

  //get logs by user
  getLogsByUser() {
    if (!this.isFinsihed) {
      console.log(this.isFinsihed);
      setTimeout(() => {
        this.getLogsByUser();
      }, 100);
    } else {
      console.log(this.userId);
      this.logService.getLogsByUser(this.userId).subscribe(data => {
        this.logs = data;
        console.log(data);
      });
      this.loading.dismiss();
    }
  }

  showCard(logId) {
    if (this.open && this.logId === logId) {
      this.open = false;
    } else {
      this.logId = logId;
      this.open = true;
      console.log(this.logId);
    }
    console.log(this.open);
  }
}

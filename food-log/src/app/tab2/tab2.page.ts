import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LogService } from "../services/log.service";
import { LoadingController } from "@ionic/angular";
import { Log } from "src/app/models/log";
import * as lodash from "lodash";
import { UserService } from "../services/user.service";
import { User } from "../models/user";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  user: User;
  public markers = [];
  logs: Log[];
  public email;
  public userId;
  public isFinsihed: boolean = false;
  public loading: HTMLIonLoadingElement;
  public lat;
  public lon;
  public geolocationPosition;

  constructor(
    private userService: UserService,
    private logService: LogService,
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController
  ) {}

  //get current location
  async ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          (this.geolocationPosition = position), console.log(position);
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
        },
        error => {
          switch (error.code) {
            case 1:
              console.log("Permission Denied");
              break;
            case 2:
              console.log("Position Unavailable");
              break;
            case 3:
              console.log("Timeout");
              break;
          }
        }
      );
    }
    this.getLogsByUser();
  }

  //get current user information
  async ionViewWillEnter() {
    this.email = (await this.userService.findUser()).email;
    this.userService.getCurrentUser(this.email).subscribe(data => {
      this.userId = data.userId;
      this.isFinsihed = true;
    });
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
        data.forEach(x => {});

        this.logs = lodash.uniqBy(data, "location");
        console.log(this.logs);
        // data.forEach(snap => {
        //   this.logs.push({
        //     logId: snap.logId,
        //     userId: snap.userId,
        //     date: snap.date,
        //     location: snap.location,
        //     rating: snap.rating,
        //     lat: snap.lat,
        //     lng: snap.lng,
        //     imageURL: snap.imageURL
        //   });
        // });

        console.log(data);
      });
    }
  }
}

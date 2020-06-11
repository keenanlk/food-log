import { Component, OnInit, Input } from "@angular/core";
import {
  ModalController,
  ToastController,
  LoadingController,
} from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Log } from "../../models/log";
import { LogService } from "../../services/log.service";
import { NavParams } from "@ionic/angular";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { Observable } from "rxjs";
import * as randomstring from "randomstring";
@Component({
  selector: "app-newlog",
  templateUrl: "./newlog.component.html",
  styleUrls: ["./newlog.component.scss"],
})
export class NewlogComponent implements OnInit {
  @Input() userId;

  constructor(
    public modalController: ModalController,
    private http: HttpClient,
    private logService: LogService,
    navParams: NavParams,
    public toastController: ToastController,
    private afStorage: AngularFireStorage,
    private loadingCtrl: LoadingController
  ) {
    console.log(navParams);
    this.userId = navParams.get("userId");
    console.log(this.userId);
  }
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  public event;
  public ip;
  public lat;
  public lon;
  public date;
  public log: Log;
  public location;
  public rating;
  public comments;
  public geolocationPosition;
  public imgSrc;
  public file;
  public downloadUrl: string = null;
  public loading;
  //get current location
  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          (this.geolocationPosition = position), console.log(position);
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
        },
        (error) => {
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
  }

  ionViewWillEnter() {
    this.date = new Date();
  }

  public dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  //Probably no longer need this code as using the navigator api
  // public getIPAddress() {
  //   return this.http.get("https://api.ipify.org/?format=json");
  // }

  // getLocation() {
  //   return this.http.get(
  //     "https://api.ipstack.com/" +
  //       this.ip +
  //       "?access_key=53816d29c9994fd549cbcddef2363bf6"
  //   );
  // }

  //submit a new log
  async submit(location: string, rating: number, comments: string) {
    if (this.file) {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
      await this.uploadImage().then((data) => {
        this.downloadUrl = data;
      });
      console.log(this.downloadUrl);
    }

    this.log = {
      logId: null,
      userId: this.userId,
      location: location,
      date: this.date,
      rating: rating,
      lat: this.lat,
      lng: this.lon,
      imageURL: this.downloadUrl,
      comments: comments,
    };
    this.logService.createLog(this.log).then(() => {
      if (this.file) {
        this.loading.dismiss();
      }

      this.modalController.dismiss({
        dismissed: true,
      });
      this.presentToast();
    });
    console.log(location);
    console.log(rating);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Your food has been logged",
      duration: 3000,
    });
    toast.present();
  }

  async uploadImage(): Promise<any> {
    const file = this.event.target.files[0];
    const path =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const task = await this.afStorage.upload(path, file);
    return task.ref.getDownloadURL();
  }

  onImageSelected(event) {
    this.event = event;
    console.log(event);
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => (this.imgSrc = reader.result);
    reader.readAsDataURL(this.file);
  }
}

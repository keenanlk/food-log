import { Component } from "@angular/core";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { FriendService } from "../services/friend.service";
import { Friend } from "../models/friend";
import { Router } from "@angular/router";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  friends: User[];
  requests: Friend[];
  users: User[] = [];
  public email;
  public userId;
  public isFinsihed: boolean = false;
  public emailRequest;
  public loading: HTMLIonLoadingElement;

  constructor(
    private userService: UserService,
    private alertCtrl: AlertController,
    private friendService: FriendService,
    private router: Router,
    public loadingCtrl: LoadingController
  ) {}

  async ionViewWillEnter() {
    //getting current user information
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.email = (await this.userService.findUser()).email;
    this.userService.getCurrentUser(this.email).subscribe((data) => {
      this.userId = data.userId;
      this.isFinsihed = true;
    });
  }

  ionViewDidEnter() {
    this.getRequests();
    this.getFriends();
  }

  //get current friends list
  getFriends() {
    if (!this.isFinsihed) {
      console.log(this.isFinsihed);
      setTimeout(() => {
        this.getFriends();
      }, 100);
    } else {
      console.log(this.userId);
      this.userService.getFriends(this.userId).subscribe((data) => {
        this.friends = data;
        this.loading.dismiss();
      });
    }
  }

  //get list of friend requests and display the user info for each request
  getRequests() {
    if (!this.isFinsihed) {
      console.log(this.isFinsihed);
      setTimeout(() => {
        this.getRequests();
      }, 100);
    } else {
      console.log(this.userId);
      this.friendService.getRequests(this.userId).subscribe((data) => {
        this.requests = data;
        data.forEach((x) => {
          this.userService.getUserById(x.userId).subscribe((snap) => {
            console.log(snap);
            this.users.unshift(snap);
          });
        });
      });
    }
  }

  //call api to confirm friend request
  updateRequest(request: Friend) {
    request.status = 1;
    this.friendService.updateRequest(request).subscribe((data) => {
      console.log(data + "updated firend");
      this.users = [];
      this.getRequests();
      this.getFriends();
    });
  }

  //show alert to enter email address of friend to be added
  async showModal() {
    const alert = await this.alertCtrl.create({
      header: "Enter the email address of the friend you would like to add.",
      inputs: [
        {
          name: "email",
          placeholder: "johndoe@gmail.com",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {
            console.log("canceled");
          },
        },
        {
          text: "Add",
          handler: (data) => {
            this.emailRequest = data.email;
            console.log(this.emailRequest);
            this.friendService.sendRequest(this.userId, data.email);
          },
        },
      ],
    });
    await alert.present();
    console.log(this.emailRequest);
  }

  //show friends Food map
  showFoodMap(firendId, userId) {
    //object is messed up in api, basically show the id of the one that is not the current users id
    if (this.userId == firendId) {
      this.router.navigateByUrl(`tabs/tab3/map/${userId}`);
    } else {
      this.router.navigateByUrl(`tabs/tab3/map/${firendId}`);
    }
  }
}

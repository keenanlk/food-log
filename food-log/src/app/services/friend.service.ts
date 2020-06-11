import { Injectable } from "@angular/core";
import { Friend } from "../models/friend";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class FriendService {
  public friend: Friend;
  public friendId;
  public isFinished = false;

  //url: string = "http://192.168.1.13:3000/friends";
  url: string = "https://floating-citadel-08737.herokuapp.com/friends";

  constructor(
    private httpClient: HttpClient,
    private userSerice: UserService,
    public toastController: ToastController
  ) {}

  //create a new friend request in db
  sendRequest(userId, email) {
    this.userSerice.getCurrentUser(email).subscribe(data => {
      this.friendId = data.userId;
      this.friend = {
        id: null,
        userId: userId,
        friendId: this.friendId,
        status: 0
      };
      this.isFinished = true;
      this.createRequest(this.friend).subscribe(data => {
        console.log(data);

        this.presentToast("Friend request has been sent.");
      }),
        error => {
          this.presentToast("No user found with that email");
        };
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  //get requests
  getRequests(id: number) {
    return this.httpClient.get<Friend[]>(this.url + "/" + id);
  }

  //create request
  createRequest(friend: Friend): Observable<any> {
    return this.httpClient.post<any>(this.url, friend);
  }

  //update request
  updateRequest(friend: Friend): Observable<any> {
    return this.httpClient.put<any>(this.url + "/" + friend.id, null);
  }
}

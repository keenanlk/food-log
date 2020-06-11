import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  //url: string = "http://192.168.1.13:3000/users";
  url: string = "https://floating-citadel-08737.herokuapp.com/users";

  displayName: string;
  email: string;
  user: User;
  private currentUser;

  constructor(
    private httpClient: HttpClient,
    private afAuth: AngularFireAuth
  ) {}

  //get current user from firebase
  async findUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  //get array of users that are friends of the current user
  getFriends(userId) {
    return this.httpClient.get<User[]>(this.url + "/friends/" + userId);
  }

  //create new user in db
  createUser(displayName: string, email: string): Observable<any> {
    console.log(email);

    this.user = {
      userId: null,
      displayName: displayName,
      email: email
    };

    //let params = new HttpParams().set("newUser", this.user);
    return this.httpClient.post<any>(this.url, this.user);
  }

  //get current user from db by email
  getCurrentUser(email: string) {
    console.log(email);
    return this.httpClient.get<User>(this.url + `/${email}`);
  }

  //get current user from db by id
  getUserById(id: number) {
    return this.httpClient.get<User>(this.url + "/id/" + id);
  }
}
